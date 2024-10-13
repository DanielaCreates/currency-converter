document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '2d24f1dad8aeaee583f51565'; // Replace with your ExchangeRate-API key
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');
    const convertButton = document.getElementById('convertButton');
    const topCurrenciesTableBody = document.querySelector('#topCurrenciesTable tbody');

    // Fetch currency options and populate the dropdowns
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
            option.textContent = `${symbol[0]} - ${symbol[1]}`;
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

    // Fetch and display top 10 currencies in table
    const topCurrencies = [
        { country: 'United States', symbol: 'USD' },
        { country: 'Eurozone', symbol: 'EUR' },
        { country: 'Japan', symbol: 'JPY' },
        { country: 'United Kingdom', symbol: 'GBP' },
        { country: 'Australia', symbol: 'AUD' },
        { country: 'Canada', symbol: 'CAD' },
        { country: 'Switzerland', symbol: 'CHF' },
        { country: 'China', symbol: 'CNY' },
        { country: 'Hong Kong', symbol: 'HKD' },
        { country: 'Singapore', symbol: 'SGD' }
    ];

    topCurrencies.forEach(currency => {
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency.symbol}/PHP`)
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    const phpRate = data.conversion_rate;
                    
                    // Fetch USD and EUR equivalent for comparison
                    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency.symbol}/USD`)
                        .then(response => response.json())
                        .then(usdData => {
                            const usdRate = usdData.conversion_rate;

                            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency.symbol}/EUR`)
                                .then(response => response.json())
                                .then(eurData => {
                                    const eurRate = eurData.conversion_rate;

                                    // Create table row
                                    const row = document.createElement('tr');
                                    row.innerHTML = `
                                        <td>${currency.country}</td>
                                        <td>1</td>
                                        <td>${currency.symbol}</td>
                                        <td>${eurRate.toFixed(2)} EUR</td>
                                        <td>${usdRate.toFixed(2)} USD</td>
                                        <td>${phpRate.toFixed(2)} PHP</td>
                                    `;
                                    topCurrenciesTableBody.appendChild(row);
                                });
                        });
                } else {
                    topCurrenciesTableBody.innerHTML = '<tr><td colspan="6">Error fetching top currencies.</td></tr>';
                }
            });
    });
});
