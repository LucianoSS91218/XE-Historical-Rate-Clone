import "./HistoricalRateTable.css";
import HISTORICAL_COUNTRIES_TABLE from "../Countries";
import { useHistoricalRate } from "../store/useHistoricalRate";

const MONTHS_NAMES = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export function HistoricalRateTable({ result }) {
  const { selectedCurrency, selectedDate } = useHistoricalRate();

  return (
    <div className="aligntable">
      <section className="section-table">
        <div className="section-titles">
          <h2>
            {`Currency Table: ${selectedCurrency} --- ${HISTORICAL_COUNTRIES_TABLE.HISTORICAL_COUNTRIES_TABLE[selectedCurrency]}`}
          </h2>

          <p id="miniinfo">
            All figures are mid-market rates, which are not available to
            consumers and are for informational purposes only.
          </p>
        </div>
        <p id="datechoosed">{`${MONTHS_NAMES[selectedDate.month]} ${
          selectedDate.day >= 1 && selectedDate.day < 10 ? "0" : ""
        }${selectedDate.day}, ${selectedDate.year} 16:00 UTC`}</p>

        <div className="container-box-historicalrate">
          <div className="blockcontainer-historicalrate">
            <table className="table-historicalrate">
              <thead>
                <tr>
                  <th>
                    <button className="first-title">CURRENCY</button>
                  </th>
                  <th>
                    <button className="second-title">NAME</button>
                  </th>
                  <th>
                    <button className="third-title">
                      {selectedCurrency} PER UNIT
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.map((data) => (
                  <tr key={data.currency}>
                    <th className="th-shortcut-currency">
                      <a className="anchor">{data.currency}</a>
                    </th>
                    <td className="td-name-currency">
                      {
                        HISTORICAL_COUNTRIES_TABLE.HISTORICAL_COUNTRIES_TABLE[
                          data.currency
                        ]
                      }
                    </td>
                    <td className="td-unit">{data.perUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
