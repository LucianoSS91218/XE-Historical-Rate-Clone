import "./index.css";
import { useState } from "react";
import { HistoricalRateForm } from "./components/HistoricalRateForm";
import { HistoricalRateTable } from "./components/HistoricalRateTable.jsx";
import { useHistoricalRate } from "./store/useHistoricalRate.js";
import { getHistoricalRate } from "./services/getHistoricalRate.js";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [result, setResult] = useState([]);

  const { selectedDate, selectedCurrency } = useHistoricalRate();

  const formatDateToISO = () =>
    `${selectedDate.year}-${selectedDate.month
      .toString()
      .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;

  const requestHistoricalRate = async () => {
    const dateSelected = formatDateToISO();
    try {
      setLoading(true);
      const data = await getHistoricalRate(
        `${dateSelected}`,
        `${selectedCurrency}`
      );
      setResult(data);
      setLoading(false);
    } catch (error) {
      setError(`a error has ocurred, ${error}`);
      // Include original error message
    }
  };

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  async function handleRequest() {
    delay(1300, () => {
      setIsFetched(!isFetched);
      requestHistoricalRate();
    });
  }

    return (
    <div className="container-app">
      <HistoricalRateForm handleRequest={handleRequest} />
      {error && <p>An error has ocurred</p>}
      {!loading && isFetched && <HistoricalRateTable result={result} />}
    </div>
  );
};
export default App;
