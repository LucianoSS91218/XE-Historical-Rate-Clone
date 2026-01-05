import { useState } from "react";
import "./HistoricalRateForm.css";
import { SelectDropdown } from "./SelectDropdown";
import { DatePicker } from "./DatePicker.jsx";
import { useHistoricalRate } from "../store/useHistoricalRate.js";
import "./Currency.css";
import HISTORICAL_COUNTRIES_SELECTOR from "../Countries.js";

export const HistoricalRateForm = ({ handleRequest }) => {
  const { selectedCurrency, selectedDate, handleCurrency, handleDateChange } =
    useHistoricalRate();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);
  const closeDropdown = () => setIsOpenDropdown(false);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const toggleDatePicker = () => setIsOpenDatePicker(!isOpenDatePicker);
  const closeDatePicker = () => setIsOpenDatePicker(false);

  const getFlag = (country) => {
    if (country === "EUR") {
      return `https://www.xe.com/svgs/flags/eur.static.svg`;
    } else {
      return `https://flagsapi.com/${country.substring(0, 2)}/flat/64.png`;
    }
  };

  const formatDateToISO = () =>
    `${selectedDate.year}-${selectedDate.month
      .toString()
      .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;

  return (
    <div>
      <div className="container">
        <section className="flex align">
          <div className="info-container">
            <h1>Historical rate tables</h1>
            <p className="historical-rate-description">
              Build historic rate tables with your chosen base currency with XE
              Currency Tables. For commercial purposes, get an automated
              currency feed through the XE Currency Data API.
            </p>
          </div>

          <form className="form-container">
            <h3>Select currency & date</h3>
            <label className="title-currency" htmlFor="currency">
              Currency
            </label>
            <div className="" id="currency-container">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                aria-describedby="currency-descriptiveText"
                className="btn-currency"
                onClick={toggleDropdown}
              >
                <div className="containerfirstgroup">
                  <div className="containerimgcurrency">
                    <img
                      alt={`${selectedCurrency}`}
                      loading="lazy"
                      decoding="async"
                      src={getFlag(selectedCurrency)}
                      width="20px"
                    />
                  </div>
                  <div id="currency-descriptiveText" className="">
                    <span className="selectedcurrency">
                      {selectedCurrency} –
                    </span>
                    <span className="currency-description">
                      {` ${HISTORICAL_COUNTRIES_SELECTOR.HISTORICAL_COUNTRIES_SELECTOR[selectedCurrency]}`}
                    </span>
                  </div>
                </div>
                <div className="containersecondgroup">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 10"
                    aria-hidden="true"
                    width="0.9rem"
                    height="0.9rem"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M8 9.5L.5 2 1.55.95 8 7.4 14.45.95 15.5 2 8 9.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
              {isOpenDropdown && (
                <SelectDropdown
                  isOpen={isOpenDropdown}
                  onClose={closeDropdown}
                  handleCurrency={handleCurrency}
                />
              )}
            </div>

            <label htmlFor="date" id="date">
              Date
            </label>
            <button
              className="btn-date"
              onClick={(e) => {
                e.preventDefault();
                toggleDatePicker();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
              </svg>
              {`${formatDateToISO()}`}
            </button>
            <div className="aligndatepicker">
              {isOpenDatePicker && (
                <DatePicker
                  isOpen={isOpenDatePicker}
                  onClose={closeDatePicker}
                  handlePickDate={handleDateChange}
                />
              )}
            </div>
            <button
              className="btn-submit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleRequest();
              }}
            >
              Confirm
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
