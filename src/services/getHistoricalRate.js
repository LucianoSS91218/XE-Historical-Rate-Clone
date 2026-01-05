const API_URL = "http://data.fixer.io/api/";
const API_KEY = "INSERT_YOUR_API_KEY_HERE";

const countries = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AUD",
  "CAD",
  "SGD",
  "CHF",
  "JPY",
  "CNY",
  "NZD",
  "HKD",
  "ILS",
  "MXN",
  "BRL",
  "KRW",
  "QAR",
  "RUB",
  "SAR",
  "SEK",
  "TRY",
  "ARS",
];
export const getHistoricalRate = async (selectedDate, selectedCurrency) => {
  try {
    const response = await fetch(
      `${API_URL}${selectedDate}?access_key=${API_KEY}&symbols=${countries.join(
        ","
      )}`
    );
    if (!response.ok) throw Error("Something went wrong!");
    const data = await response.json();
    const rates = data.rates;
    const baseRate = rates[selectedCurrency];

    return Object.entries(rates).map(([currency, rate]) => ({
      currency,
      perUnit: rate / baseRate,
    }));
  } catch (error) {
    console.log("Something went wrong!" + error);
  }
};
