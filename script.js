document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '966a5f4ea7d0346a66e229be'; // Your ExchangeRate API key
    const currentsApiKey = 'clZAZb9PIl_Sm3LAf5k9MUKYqa3bCSjevy0jaU_-XDl2Y4Sv'; // Your CurrentsAPI key
    const currentsApiUrl = `https://api.currentsapi.services/v1/search?keywords=currency&apiKey=${currentsApiKey}`;
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencyContainer = document.getElementById('toCurrencyContainer');
    const addCurrencyButton = document.getElementById('addCurrencyButton');
    const resultDiv = document.getElementById('result');
    const topCurrenciesTableBody = document.querySelector('#topCurrenciesTable tbody');
    const newsContainer = document.getElementById("news-container");

    // Fetch currency options and populate the dropdowns concurrently
    async function fetchCurrencyCodes() {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
            const data = await response.json();
            if (data.result === 'success') {
                const symbols = data.supported_codes;
                populateCurrencyOptions(symbols, fromCurrencySelect);

                const firstToCurrencySelect = toCurrencyContainer.querySelector('.toCurrencySelect');
                populateCurrencyOptions(symbols, firstToCurrencySelect);
                firstToCurrencySelect.value = "USD";

                fromCurrencySelect.value = "PHP";
                autoConvert();
            } else {
                resultDiv.innerHTML = 'Error loading currency symbols.';
            }
        } catch (error) {
            resultDiv.innerHTML = 'Failed to load currency symbols.';
            console.error(error);
        }
    }

    function populateCurrencyOptions(symbols, selectElement) {
        symbols.forEach(symbol => {
            const option = document.createElement('option');
            option.value = symbol[0];
            option.textContent = `${symbol[0]} - ${symbol[1]}`;
            selectElement.appendChild(option);
        });
    }

    async function autoConvert() {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrencySelects = Array.from(document.querySelectorAll('.toCurrencySelect'));

        if (amount && fromCurrency) {
            resultDiv.innerHTML = '';
            try {
                const fetches = toCurrencySelects.map(select => {
                    const toCurrency = select.value;
                    if (!toCurrency) return Promise.resolve(null);
                    return fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
                        .then(response => response.json());
                });

                const results = await Promise.all(fetches);
                results.forEach((data, index) => {
                    const toCurrency = toCurrencySelects[index].value;
                    if (data && data.result === 'success') {
                        const convertedAmount = (amount * data.conversion_rate).toFixed(2);
                        resultDiv.innerHTML += `<p>${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</p>`;
                    } else {
                        resultDiv.innerHTML += `<p>Error converting to ${toCurrency}.</p>`;
                    }
                });
            } catch (error) {
                console.error('Error during conversion:', error);
                resultDiv.innerHTML = 'Failed to fetch conversion rates.';
            }
        } else {
            resultDiv.innerHTML = 'Please enter all the details.';
        }
    }

    amountInput.addEventListener('input', autoConvert);
    fromCurrencySelect.addEventListener('change', autoConvert);
    toCurrencyContainer.addEventListener('change', autoConvert);

    // Function to add a new currency dropdown
    async function addNewCurrencyField() {
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

        // Populate options in the new select element using async/await
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
            const data = await response.json();
            if (data.result === 'success') {
                populateCurrencyOptions(data.supported_codes, newSelect);
            } else {
                console.error('Failed to load currency symbols.');
            }
        } catch (error) {
            console.error('Error fetching currency codes:', error);
        }

        // Add event listener to the remove button
        removeButton.addEventListener('click', function () {
            newCurrencyDiv.remove();
            autoConvert(); // Recalculate after removal
        });

        // Append the new currency selector to the container
        toCurrencyContainer.appendChild(newCurrencyDiv);
    }

    addCurrencyButton.addEventListener('click', function (e) {
        e.preventDefault();
        addNewCurrencyField();
    });

    // Fetch and display top 10 currencies
    async function fetchTopCurrencies() {
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

        try {
            const fetches = topCurrencies.map(currency =>
                Promise.all([
                    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency.symbol}/PHP`).then(res => res.json()),
                    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency.symbol}/USD`).then(res => res.json()),
                    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency.symbol}/EUR`).then(res => res.json())
                ])
            );

            const results = await Promise.all(fetches);
            results.forEach((data, index) => {
                const [phpData, usdData, eurData] = data;
                const currency = topCurrencies[index];

                if (phpData.result === 'success' && usdData.result === 'success' && eurData.result === 'success') {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${currency.country}</td>
                        <td>1</td>
                        <td>${currency.symbol}</td>
                        <td>${eurData.conversion_rate.toFixed(2)} EUR</td>
                        <td>${usdData.conversion_rate.toFixed(2)} USD</td>
                        <td>${phpData.conversion_rate.toFixed(2)} PHP</td>
                    `;
                    topCurrenciesTableBody.appendChild(row);
                }
            });
        } catch (error) {
            topCurrenciesTableBody.innerHTML = '<tr><td colspan="6">Failed to load currency rates.</td></tr>';
        }
    }

    // Fetch and display news articles from CurrentsAPI
    async function fetchCurrencyNews() {
        try {
            const response = await fetch(currentsApiUrl);
            const data = await response.json();

            if (data.news && data.news.length > 0) {
                const uniqueArticles = Array.from(new Set(data.news.map(article => article.url)))
                    .map(url => data.news.find(article => article.url === url));
                displayNews(uniqueArticles);
            } else {
                newsContainer.innerHTML = '<p>No currency-related news available at the moment.</p>';
            }
        } catch (error) {
            newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = "";

        articles.forEach(article => {
            const newsElement = document.createElement("div");
            newsElement.classList.add("news-item");

            newsElement.innerHTML = `
                <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                <p><strong>Source:</strong> ${article.author || "Unknown"} | <strong>Published:</strong> ${new Date(article.published).toLocaleDateString()}</p>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;

            newsContainer.appendChild(newsElement);
        });
    }

    // Initialize fetching operations
    fetchCurrencyCodes();
    fetchTopCurrencies();
    fetchCurrencyNews();
});
