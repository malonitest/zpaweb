#!/bin/bash

# Custom Domain Setup Script for Azure Static Web App
# Domain: www.autozastava24.cz
# Azure Static Web App: white-plant-0d6798303

echo "================================================"
echo "Custom Domain Setup for AutoZástava24"
echo "================================================"
echo ""

# Variables
RESOURCE_GROUP="your-resource-group-name"
STATIC_WEB_APP_NAME="white-plant-0d6798303"
CUSTOM_DOMAIN="www.autozastava24.cz"

echo "⚠️  PREREQUISITES:"
echo "1. Azure CLI installed (az)"
echo "2. Logged in to Azure (az login)"
echo "3. DNS CNAME record already configured:"
echo "   Type: CNAME"
echo "   Name: www"
echo "   Value: white-plant-0d6798303.3.azurestaticapps.net"
echo ""
read -p "Have you completed the DNS configuration? (y/n): " DNS_READY

if [ "$DNS_READY" != "y" ]; then
    echo "Please configure DNS first, then run this script again."
    exit 1
fi

echo ""
echo "================================================"
echo "Step 1: Finding your Azure Static Web App"
echo "================================================"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed."
    echo "Install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if logged in
az account show &> /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Azure."
    echo "Run: az login"
    exit 1
fi

echo "✅ Azure CLI is installed and authenticated"
echo ""

# List Static Web Apps to find the resource group
echo "Searching for Static Web App: $STATIC_WEB_APP_NAME"
APP_INFO=$(az staticwebapp list --query "[?name=='$STATIC_WEB_APP_NAME']" -o json)

if [ "$APP_INFO" == "[]" ]; then
    echo "❌ Static Web App not found. Please update RESOURCE_GROUP variable manually."
    echo ""
    echo "To find your app, run:"
    echo "  az staticwebapp list -o table"
    exit 1
fi

RESOURCE_GROUP=$(echo $APP_INFO | jq -r '.[0].resourceGroup')
echo "✅ Found Static Web App in resource group: $RESOURCE_GROUP"
echo ""

echo "================================================"
echo "Step 2: Adding Custom Domain"
echo "================================================"

echo "Adding custom domain: $CUSTOM_DOMAIN"
az staticwebapp hostname set \
    --name "$STATIC_WEB_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --hostname "$CUSTOM_DOMAIN"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Custom domain added successfully!"
    echo ""
    echo "================================================"
    echo "Step 3: Validation & SSL Certificate"
    echo "================================================"
    echo "Azure will now:"
    echo "1. Validate your DNS CNAME record"
    echo "2. Provision a free SSL certificate (can take 5-10 minutes)"
    echo ""
    echo "Check status with:"
    echo "  az staticwebapp hostname show \\"
    echo "    --name $STATIC_WEB_APP_NAME \\"
    echo "    --resource-group $RESOURCE_GROUP \\"
    echo "    --hostname $CUSTOM_DOMAIN"
    echo ""
    echo "Once ready, your site will be available at:"
    echo "  https://$CUSTOM_DOMAIN"
else
    echo ""
    echo "❌ Failed to add custom domain."
    echo "Common issues:"
    echo "1. DNS not propagated yet (wait 5-10 minutes)"
    echo "2. CNAME record not configured correctly"
    echo "3. Domain already in use"
    echo ""
    echo "Verify DNS with: nslookup www.autozastava24.cz"
fi

echo ""
echo "================================================"
echo "Done!"
echo "================================================"
