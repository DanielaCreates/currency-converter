document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '2d24f1dad8aeaee583f51565';
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencyContainer = document.getElementById('toCurrencyContainer');
    const addCurrencyButton = document.getElementById('addCurrencyButton');
    const resultDiv = document.getElementById('result');
    const topCurrenciesTableBody = document.querySelector('#topCurrenciesTable tbody');

    // Fetch currency options and populate the dropdowns
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const symbols = data.supported_codes;
                populateCurrencyOptions(symbols, fromCurrencySelect);

                // Populate the initial "To" currency dropdown with PHP as default
                const firstToCurrencySelect = toCurrencyContainer.querySelector('.toCurrencySelect');
                populateCurrencyOptions(symbols, firstToCurrencySelect);
                firstToCurrencySelect.value = "USD";

                // Set USD as default in the "From" dropdown
                fromCurrencySelect.value = "PHP";

                // Perform an initial conversion
                autoConvert();
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

    // Automatically convert when input or selection changes
    function autoConvert() {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrencySelects = document.querySelectorAll('.toCurrencySelect');

        if (amount && fromCurrency) {
            resultDiv.innerHTML = ''; // Clear previous results

            toCurrencySelects.forEach(select => {
                const toCurrency = select.value;
                if (!toCurrency) return; // Skip if no 'To' currency is selected

                fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.result === 'success') {
                            const exchangeRate = data.conversion_rate;
                            const convertedAmount = (amount * exchangeRate).toFixed(2);
                            resultDiv.innerHTML += `<p>${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</p>`;
                        } else {
                            resultDiv.innerHTML += `<p>Error converting to ${toCurrency}.</p>`;
                        }
                    })
                    .catch(error => {
                        resultDiv.innerHTML += `<p>Failed to fetch conversion rate for ${toCurrency}.</p>`;
                    });
            });
        } else {
            resultDiv.innerHTML = 'Please enter all the details.';
        }
    }

    // Add event listeners to trigger live conversion
    amountInput.addEventListener('input', autoConvert);
    fromCurrencySelect.addEventListener('change', autoConvert);
    toCurrencyContainer.addEventListener('change', autoConvert);

    // Function to add a new currency dropdown
    function addNewCurrencyField() {
        const newCurrencyDiv = document.createElement('div');
        newCurrencyDiv.classList.add('form-control');

        const newLabel = document.createElement('label');
        newLabel.textContent = 'To:';
        newCurrencyDiv.appendChild(newLabel);

        const newSelect = document.createElement('select');
        newSelect.classList.add('toCurrencySelect');
        newCurrencyDiv.appendChild(newSelect);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('removeCurrency');
        newCurrencyDiv.appendChild(removeButton);

        // Populate options in the new select element
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    populateCurrencyOptions(data.supported_codes, newSelect);
                }
            });

        // Add event listener to the remove button
        removeButton.addEventListener('click', function () {
            newCurrencyDiv.remove();
            autoConvert(); // Recalculate after removal
        });

        // Append the new currency selector to the container
        toCurrencyContainer.appendChild(newCurrencyDiv);
    }

    // Add functionality to add more currency selectors
    addCurrencyButton.addEventListener('click', function (e) {
        e.preventDefault();
        addNewCurrencyField();
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
