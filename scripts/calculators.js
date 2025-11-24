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

  const attachPaymentCalculator = () => {
    const form = document.getElementById('paymentCalculator');
    if (!form) {
      return;
    }

    const amountInput = form.querySelector('[name="loanAmount"]');
    const termInput = form.querySelector('[name="loanTerm"]');
    const rateInput = form.querySelector('[name="loanRate"]');
    const monthlyOutput = document.getElementById('paymentMonthly');
    const totalOutput = document.getElementById('paymentTotal');
    const aprOutput = document.getElementById('paymentApr');

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
        rate: annualRate
      });
    };

    ['input', 'change'].forEach(evt => {
      amountInput.addEventListener(evt, calculate);
      termInput.addEventListener(evt, calculate);
      rateInput.addEventListener(evt, calculate);
    });

    form.addEventListener('submit', event => event.preventDefault());
    calculate();
  };

  const attachValueEstimator = () => {
    const form = document.getElementById('valueEstimator');
    if (!form) {
      return;
    }

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

    const brandInput = form.querySelector('[name="brand"]');
    const modelInput = form.querySelector('[name="model"]');
    const yearInput = form.querySelector('[name="year"]');
    const kmInput = form.querySelector('[name="kilometers"]');
    const conditionInput = form.querySelector('[name="condition"]');
    const valueOutput = document.getElementById('estimatorValue');
    const loanOutput = document.getElementById('estimatorLoan');

    const calculate = () => {
      const brandKey = (brandInput.value || 'default').toLowerCase();
      const baseValue = brandValues[brandKey] || brandValues.default;
      const year = Math.max(2005, Math.min(new Date().getFullYear(), parseInt(yearInput.value, 10) || new Date().getFullYear()));
      const kilometers = Math.max(0, parseInt(kmInput.value, 10) || 0);
      const conditionMultiplier = parseFloat(conditionInput.value) || 1;

      const currentYear = new Date().getFullYear();
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
        condition: conditionInput.selectedOptions[0]?.dataset?.label || conditionInput.value
      });
    };

    ['input', 'change'].forEach(evt => {
      brandInput.addEventListener(evt, calculate);
      modelInput.addEventListener(evt, calculate);
      yearInput.addEventListener(evt, calculate);
      kmInput.addEventListener(evt, calculate);
      conditionInput.addEventListener(evt, calculate);
    });

    form.addEventListener('submit', event => event.preventDefault());
    calculate();
  };

  const attachRpsnCalculator = () => {
    const form = document.getElementById('rpsnCalculator');
    if (!form) {
      return;
    }

    const amountInput = form.querySelector('[name="rpsnAmount"]');
    const rateInput = form.querySelector('[name="rpsnRate"]');
    const feeInput = form.querySelector('[name="rpsnFees"]');
    const termInput = form.querySelector('[name="rpsnTerm"]');
    const paymentOutput = document.getElementById('rpsnMonthly');
    const costOutput = document.getElementById('rpsnTotal');
    const aprOutput = document.getElementById('rpsnApr');

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
        fees
      });
    };

    ['input', 'change'].forEach(evt => {
      amountInput.addEventListener(evt, calculate);
      rateInput.addEventListener(evt, calculate);
      feeInput.addEventListener(evt, calculate);
      termInput.addEventListener(evt, calculate);
    });

    form.addEventListener('submit', event => event.preventDefault());
    calculate();
  };

  document.addEventListener('DOMContentLoaded', () => {
    attachPaymentCalculator();
    attachValueEstimator();
    attachRpsnCalculator();
  });
})();
