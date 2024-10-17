# Currency Converter & News Feed

## Project Overview:

This project is a **Currency Converter** web application that allows users to:
- Convert a specified amount from one currency to another.
- Dynamically add multiple currency options to compare conversion rates.
- Fetch and display live currency-related news using **CurrentsAPI**.
- View the top 10 currencies and their equivalents in PHP, USD, and EUR.

## Project Files:

1. **index.html**:  
   The main structure of the web page, including the input form for the currency converter, the table for top currency rates, and the section for displaying the latest currency-related news.

2. **script.js**:  
   Handles the core functionality of the currency converter, fetching exchange rates, adding/removing currency options, and fetching the latest news about currencies.

3. **styles.css**:  
   Provides styling for the application, including layout, form controls, buttons, tables, and the news feed.

## Features:

- **Live Currency Conversion**:  
  Automatically converts the input amount as soon as the user types the amount or changes the selected currencies.

- **Add Multiple "To" Currencies**:  
  Users can dynamically add additional currency dropdowns to compare conversion rates for multiple currencies at once.

- **Remove Currency Option**:  
  Users can remove a currency conversion option, and the results will be updated accordingly.

- **Top 10 Currencies to PHP**:  
  A table that dynamically displays the top 10 currency rates to PHP, including their equivalents in USD and EUR.

- **Currency News Integration**:  
  Displays the latest news articles related to currency markets, powered by **CurrentsAPI**.

- **Responsive Design**:  
  The layout is responsive and adjusts based on the screen size for optimal viewing across devices.

## How to Use:

1. **Clone/Download the Project**:  
   Download the project files and open `index.html` in your browser.

2. **Input Amount**:  
   Enter the amount you wish to convert.

3. **Choose Currencies**:  
   Select the "From" and "To" currencies from the dropdown menus. Conversion will happen automatically.

4. **Add Another Currency**:  
   Click the "Add Another Currency" button to add more "To" currency dropdowns. You can compare multiple conversions at once.

5. **Remove Currency**:  
   You can remove a dynamically added currency option by clicking the "Remove" button next to it.

6. **View Top 10 Currencies**:  
   The page displays the top 10 currencies with their conversion rates to PHP, USD, and EUR.

7. **Read Currency-Related News**:  
   Currency-related news articles will be fetched and displayed from **CurrentsAPI** under the news section.

## File Descriptions:

1. **index.html**:  
   This file contains the structure of the web page, with key sections including:
   - **Converter Form**: The main section where the user enters the amount, selects the "From" and "To" currencies, and adds more currency options if needed.
   - **Top Currencies Table**: Displays the top 10 currency conversion rates to PHP, USD, and EUR.
   - **Currency News Feed**: Displays the latest currency news fetched from **CurrentsAPI**.

2. **script.js**:  
   The main functionality of the app:
   - **Fetching Currency Data**: Fetches supported currencies and their exchange rates using the ExchangeRate API.
   - **Live Conversion**: Automatically converts the currency based on user input and selection changes.
   - **Adding/Removing Currencies**: Dynamically adds or removes currency dropdowns for the user to compare conversion rates.
   - **Displaying Top Currencies**: Fetches and displays the top 10 currencies' conversion rates in a table.
   - **Currency News**: Fetches and displays the latest currency news using **CurrentsAPI**.

3. **styles.css**:  
   Provides the styling for the layout and appearance of the app:
   - **Form Styling**: Styles for the input fields, buttons, and labels.
   - **Table Styling**: Styles for the currency conversion result table and top 10 currencies table.
   - **News Section Styling**: Styles for displaying the currency-related news articles.
   - **Responsive Design**: Ensures the layout adjusts properly on smaller screens like mobile devices.

## Dependencies:

- **ExchangeRate API**:  
   This project uses the ExchangeRate API to fetch live currency exchange rates.  
   Ensure you replace the API key in `script.js` with your valid API key.

- **CurrentsAPI**:  
   This project uses the CurrentsAPI to fetch the latest currency-related news.  
   Ensure you replace the API key in `script.js` with your valid CurrentsAPI key.

## Setup Instructions:

1. **Clone or Download the Repository**:
   - Clone or download the project files.

2. **Replace the API Keys**:
   - Replace the API key for the ExchangeRate API and CurrentsAPI in `script.js` with your own valid API keys.
   ```javascript
   const apiKey = 'your-exchange-rate-api-key-here'; // Replace with your ExchangeRate API key
   const currentsApiKey = 'your-currents-api-key-here'; // Replace with your CurrentsAPI key
   ```

3. **Open `index.html`**:
   - Open the `index.html` file in your browser to start using the Currency Converter.

---
