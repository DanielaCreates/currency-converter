document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '2d24f1dad8aeaee583f51565';
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');
    const convertButton = document.getElementById('convertButton');

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const symbols = data.supported_codes;
                populateCurrencyOptions(symbols, fromCurrencySelect);
                populateCurrencyOptions(symbols, toCurrencySelect);
            } else {
                resultDiv.innerHTML = 'Error loading currency symbols.';
            }
        });

    // Function to populate currency options
    function populateCurrencyOptions(symbols, selectElement) {
        symbols.forEach(symbol => {
            const option = document.createElement('option');
            option.value = symbol[0];
            option.textContent = `${symbol[0]} - ${symbol[1]}`
            selectElement.appendChild(option);
        });
    }

    // Convert currency on button click
    convertButton.addEventListener('click', function () {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount && fromCurrency && toCurrency) {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        const exchangeRate = data.conversion_rate;
                        const convertedAmount = (amount * exchangeRate).toFixed(2);
                        resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                        resultDiv.classList.add('show');
                    } else {
                        resultDiv.innerHTML = 'Error converting currency.';
                    }
                });
        } else {
            resultDiv.innerHTML = 'Please enter all the details.';
        }
    });
});
