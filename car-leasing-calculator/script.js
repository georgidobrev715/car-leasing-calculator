document.addEventListener('DOMContentLoaded', function() {
    const carValueSlider = document.getElementById('car-value');
    const carValueDisplay = document.getElementById('car-value-display');
    const leasePeriodSelect = document.getElementById('lease-period');
    const downPaymentSlider = document.getElementById('down-payment');
    const downPaymentValue = document.getElementById('down-payment-value');
    const monthlyPaymentSpan = document.getElementById('monthly-payment');
    const totalLeasingCostSpan = document.getElementById('total-leasing-cost');
    const downPaymentAmountSpan = document.getElementById('down-payment-amount');
    const interestRateSpan = document.getElementById('interest-rate');
    const carTypeSelect = document.getElementById('car-type');

    // Initialize the text input with the initial range values
    carValueDisplay.value = carValueSlider.value;
    downPaymentValue.value = downPaymentSlider.value;

    function calculateMonthlyPayment() {
        const carValue = parseFloat(carValueSlider.value);
        const leasePeriod = parseInt(leasePeriodSelect.value);
        const downPaymentPercent = parseFloat(downPaymentSlider.value);
        const carType = carTypeSelect.value;
        const annualInterestRate = carType === 'brand-new' ? 0.0299 : 0.037;
        const monthlyInterestRate = annualInterestRate / 12; // Monthly interest rate

        // Calculate down payment amount
        const downPaymentAmount = (downPaymentPercent / 100) * carValue;
        const loanAmount = carValue - downPaymentAmount;

        // Calculate monthly payment
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));

        // Calculate total leasing cost
        const totalLeasingCost = (monthlyPayment * leasePeriod) + downPaymentAmount;

        // Display results
        downPaymentAmountSpan.textContent = downPaymentAmount.toFixed(2);
        monthlyPaymentSpan.textContent = monthlyPayment.toFixed(2);
        totalLeasingCostSpan.textContent = totalLeasingCost.toFixed(2);
        interestRateSpan.textContent = (annualInterestRate * 100).toFixed(2); // Annual interest rate percentage
    }

    // Update the car value display when the range slider value changes
    carValueSlider.addEventListener('input', function() {
        carValueDisplay.value = carValueSlider.value;
        calculateMonthlyPayment();
    });

    // Update the range slider when the text input value changes
    carValueDisplay.addEventListener('input', function() {
        let value = carValueDisplay.value === '' ? '' : parseInt(carValueDisplay.value, 10);

        if (value === '') {
            carValueSlider.value = carValueSlider.min;
        } else if (!isNaN(value) && value >= carValueSlider.min && value <= carValueSlider.max) {
            carValueSlider.value = value;
        }
        calculateMonthlyPayment();
    });

    carValueDisplay.addEventListener('change', function() {
        let value = parseInt(carValueDisplay.value, 10);

        if (!isNaN(value) && value >= carValueSlider.min && value <= carValueSlider.max) {
            carValueSlider.value = value;
        } else if (value < carValueSlider.min) {
            carValueDisplay.value = carValueSlider.min;
            carValueSlider.value = carValueSlider.min;
        } else if (value > carValueSlider.max) {
            carValueDisplay.value = carValueSlider.max;
            carValueSlider.value = carValueSlider.max;
        }
        calculateMonthlyPayment();
    });

    // Update the down payment value display when the range slider value changes
    downPaymentSlider.addEventListener('input', function() {
        downPaymentValue.value = downPaymentSlider.value;
        calculateMonthlyPayment();
    });

    // Update the range slider when the text input value changes
    downPaymentValue.addEventListener('input', function() {
        let value = downPaymentValue.value === '' ? '' : parseInt(downPaymentValue.value, 10);

        if (value === '') {
            downPaymentSlider.value = downPaymentSlider.min;
        } else if (!isNaN(value) && value >= downPaymentSlider.min && value <= downPaymentSlider.max) {
            downPaymentSlider.value = value;
        }
        calculateMonthlyPayment();
    });

    downPaymentValue.addEventListener('change', function() {
        let value = parseInt(downPaymentValue.value, 10);

        if (!isNaN(value) && value >= downPaymentSlider.min && value <= downPaymentSlider.max) {
            downPaymentSlider.value = value;
        } else if (value < downPaymentSlider.min) {
            downPaymentValue.value = downPaymentSlider.min;
            downPaymentSlider.value = downPaymentSlider.min;
        } else if (value > downPaymentSlider.max) {
            downPaymentValue.value = downPaymentSlider.max;
            downPaymentSlider.value = downPaymentSlider.max;
        }
        calculateMonthlyPayment();
    });

    // Add event listeners for dynamic calculation
    carValueSlider.addEventListener('input', calculateMonthlyPayment);
    leasePeriodSelect.addEventListener('change', calculateMonthlyPayment);
    carTypeSelect.addEventListener('change', calculateMonthlyPayment);

    // Initial calculation
    calculateMonthlyPayment();
});