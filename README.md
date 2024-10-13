### README for Currency Converter

#### Project Overview:
This project is a simple **Currency Converter** web application that allows users to convert a specified amount from one currency to another and dynamically add multiple currency options to compare conversion rates. Additionally, it displays the **Top 10 Currencies to PHP** in a table, including their equivalents in USD and EUR.

#### Project Files:
1. **index.html**: The main structure of the web page containing the input form for the currency converter and the table for top currency rates.
2. **script.js**: Handles the functionality of the currency conversion, fetching exchange rates, and dynamically adding/removing currency conversion options.
3. **styles.css**: Provides the styling for the page, including layout, input fields, buttons, and tables.

---

### Features:
- **Live Currency Conversion**: Automatically converts the input amount as soon as the user types the amount or changes the selected currencies.
- **Add Multiple "To" Currencies**: Users can add additional currency dropdowns to compare conversion rates for multiple currencies at once.
- **Remove Currency Option**: Users can remove a currency conversion option, and the result will be updated accordingly.
- **Top 10 Currencies to PHP**: A table that dynamically displays the top 10 currency rates, including their equivalents in PHP, USD, and EUR.
- **Responsive Design**: The layout is responsive and adjusts based on screen size for an optimal viewing experience.

---

### How to Use:
1. **Clone/Download the Project**: Download the project files and open `index.html` in your browser.
2. **Input Amount**: Enter the amount you wish to convert.
3. **Select From and To Currencies**: Choose the "From" and "To" currencies from the dropdown menus. The conversion will happen automatically.
4. **Add Another Currency**: Click the "Add Another Currency" button to add more "To" currency dropdowns. You can compare multiple conversions at once.
5. **Remove Currency**: You can remove a dynamically added currency option by clicking the "Remove" button next to it.
6. **View Top 10 Currencies**: The page displays the top 10 currencies with their conversion rates to PHP, USD, and EUR.

---

### File Descriptions:

#### 1. **index.html**:
This file contains the structure of the web page. Key sections:
- **Converter Form**: The main section where the user enters the amount, selects the "From" and "To" currencies, and adds more currency options if needed.
- **Top Currencies Table**: A section that dynamically displays the top 10 currency conversion rates to PHP, USD, and EUR.

#### 2. **script.js**:
Handles the core functionality of the app:
- **Fetching Currency Data**: Fetches supported currencies and their exchange rates using an API.
- **Live Conversion**: Automatically converts the currency based on user input and selection changes.
- **Adding/Removing Currencies**: Dynamically adds or removes currency dropdowns for the user to compare conversion rates.
- **Displaying Top Currencies**: Fetches and displays the top 10 currencies' conversion rates in a table.

#### 3. **styles.css**:
Provides styling for the layout and appearance of the app:
- **Form Styling**: Styles for the input fields, buttons, and labels.
- **Table Styling**: Styles for the currency conversion result table and top 10 currencies table.
- **Responsive Design**: Ensures the layout adjusts properly on smaller screens like mobile devices.

---

### Dependencies:
- **ExchangeRate-API**: This project uses the [ExchangeRate-API](https://www.exchangerate-api.com) to fetch live currency exchange rates. Ensure you replace the API key in `script.js` with your valid API key.

---

### Setup Instructions:
1. Clone or download the repository.
2. Replace the API key in `script.js` with your own valid ExchangeRate-API key:
   ```javascript
   const apiKey = 'your-api-key-here';
   ```
3. Open the `index.html` file in a browser to start using the Currency Converter.

---
