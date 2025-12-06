(function () {
  const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0
  });

  const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'percent',
    maximumFractionDigits: 2
  });

  const trackClarity = (eventName, payload = {}) => {
    if (typeof clarity === 'function') {
      clarity('event', eventName, Object.assign({ page: window.location.pathname }, payload));
    }
  };

  const formatCurrency = value => currencyFormatter.format(isFinite(value) ? Math.max(0, value) : 0);

  const formatPercent = value => percentFormatter.format(isFinite(value) ? value / 100 : 0);

  const preventSubmit = form => {
    if (form) {
      form.addEventListener('submit', event => event.preventDefault());
    }
  };

  const onInputsChange = (inputs, callback) => {
    inputs.filter(Boolean).forEach(input => {
      ['input', 'change'].forEach(evt => input.addEventListener(evt, callback));
    });
  };

  const attachPaymentCalculators = () => {
    const containers = document.querySelectorAll('[data-calculator="payment"]');
    containers.forEach(container => {
      const form = container.querySelector('form');
      const amountInput = container.querySelector('[data-field="loanAmount"]');
      const termInput = container.querySelector('[data-field="loanTerm"]');
      const rateInput = container.querySelector('[data-field="loanRate"]');
      const monthlyOutput = container.querySelector('[data-result="paymentMonthly"]');
      const totalOutput = container.querySelector('[data-result="paymentTotal"]');
      const aprOutput = container.querySelector('[data-result="paymentApr"]');
      if (!amountInput || !termInput || !rateInput || !monthlyOutput || !totalOutput || !aprOutput) {
        return;
      }

      const calculatorId = container.dataset.calculatorId || 'payment';
      const calculate = () => {
        const amount = Math.max(10000, parseFloat(amountInput.value) || 0);
        const term = Math.max(3, parseInt(termInput.value, 10) || 0);
        const annualRate = Math.max(0, parseFloat(rateInput.value) || 0);
        const monthlyRate = annualRate / 100 / 12;

        const monthlyPayment = monthlyRate > 0
          ? amount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)))
          : amount / term;

        const totalPaid = monthlyPayment * term;
        const effectiveApr = term > 0 && amount > 0
          ? (Math.pow(totalPaid / amount, 12 / term) - 1) * 100
          : 0;

        monthlyOutput.textContent = formatCurrency(monthlyPayment);
        totalOutput.textContent = formatCurrency(totalPaid);
        aprOutput.textContent = formatPercent(effectiveApr);

        trackClarity('calc_payment_update', {
          amount,
          term,
          rate: annualRate,
          calculatorId
        });
      };

      onInputsChange([amountInput, termInput, rateInput], calculate);
      preventSubmit(form);
      calculate();
    });
  };

  const attachValueEstimators = () => {
    const brandValues = {
      skoda: 320000,
      volkswagen: 340000,
      bmw: 450000,
      audi: 430000,
      mercedes: 470000,
      toyota: 300000,
      hyundai: 260000,
      kia: 250000,
      ford: 280000,
      default: 240000
    };

    const containers = document.querySelectorAll('[data-calculator="value"]');
    containers.forEach(container => {
      const form = container.querySelector('form');
      const brandInput = container.querySelector('[data-field="brand"]');
      const modelInput = container.querySelector('[data-field="model"]');
      const yearInput = container.querySelector('[data-field="year"]');
      const kmInput = container.querySelector('[data-field="kilometers"]');
      const conditionInput = container.querySelector('[data-field="condition"]');
      const valueOutput = container.querySelector('[data-result="estimatorValue"]');
      const loanOutput = container.querySelector('[data-result="estimatorLoan"]');

      if (!brandInput || !yearInput || !kmInput || !conditionInput || !valueOutput || !loanOutput) {
        return;
      }

      const calculatorId = container.dataset.calculatorId || 'value';
      const calculate = () => {
        const brandKey = (brandInput.value || 'default').toLowerCase();
        const baseValue = brandValues[brandKey] || brandValues.default;
        const currentYear = new Date().getFullYear();
        const year = Math.max(2005, Math.min(currentYear, parseInt(yearInput.value, 10) || currentYear));
        const kilometers = Math.max(0, parseInt(kmInput.value, 10) || 0);
        const conditionMultiplier = parseFloat(conditionInput.value) || 1;

        const age = Math.max(0, currentYear - year);
        const ageFactor = Math.max(0.45, 1 - age * 0.05);

        let kmFactor = 1;
        if (kilometers > 250000) {
          kmFactor = 0.55;
        } else if (kilometers > 180000) {
          kmFactor = 0.7;
        } else if (kilometers > 120000) {
          kmFactor = 0.82;
        } else if (kilometers > 80000) {
          kmFactor = 0.9;
        }

        const estimatedValue = Math.max(50000, baseValue * ageFactor * kmFactor * conditionMultiplier);
        const estimatedLoan = estimatedValue * 0.65;

        valueOutput.textContent = formatCurrency(estimatedValue);
        loanOutput.textContent = formatCurrency(estimatedLoan);

        trackClarity('calc_value_update', {
          brand: brandKey,
          year,
          kilometers,
          condition: conditionInput.selectedOptions?.[0]?.dataset?.label || conditionInput.value,
          calculatorId
        });
      };

      onInputsChange([brandInput, modelInput, yearInput, kmInput, conditionInput], calculate);
      preventSubmit(form);
      calculate();
    });
  };

  const attachRpsnCalculators = () => {
    const containers = document.querySelectorAll('[data-calculator="rpsn"]');
    containers.forEach(container => {
      const form = container.querySelector('form');
      const amountInput = container.querySelector('[data-field="rpsnAmount"]');
      const rateInput = container.querySelector('[data-field="rpsnRate"]');
      const feeInput = container.querySelector('[data-field="rpsnFees"]');
      const termInput = container.querySelector('[data-field="rpsnTerm"]');
      const paymentOutput = container.querySelector('[data-result="rpsnMonthly"]');
      const costOutput = container.querySelector('[data-result="rpsnTotal"]');
      const aprOutput = container.querySelector('[data-result="rpsnApr"]');

      if (!amountInput || !rateInput || !feeInput || !termInput || !paymentOutput || !costOutput || !aprOutput) {
        return;
      }

      const calculatorId = container.dataset.calculatorId || 'rpsn';
      const calculate = () => {
        const amount = Math.max(10000, parseFloat(amountInput.value) || 0);
        const term = Math.max(3, parseInt(termInput.value, 10) || 0);
        const annualRate = Math.max(0, parseFloat(rateInput.value) || 0);
        const fees = Math.max(0, parseFloat(feeInput.value) || 0);
        const monthlyRate = annualRate / 100 / 12;

        const monthlyPayment = monthlyRate > 0
          ? amount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)))
          : amount / term;

        const totalPaid = monthlyPayment * term + fees;
        const apr = term > 0 && amount > 0
          ? (Math.pow(totalPaid / amount, 12 / term) - 1) * 100
          : 0;

        paymentOutput.textContent = formatCurrency(monthlyPayment);
        costOutput.textContent = formatCurrency(totalPaid);
        aprOutput.textContent = formatPercent(apr);

        trackClarity('calc_rpsn_update', {
          amount,
          term,
          rate: annualRate,
          fees,
          calculatorId
        });
      };

      onInputsChange([amountInput, rateInput, feeInput, termInput], calculate);
      preventSubmit(form);
      calculate();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    attachPaymentCalculators();
    attachValueEstimators();
    attachRpsnCalculators();
  });
})();
