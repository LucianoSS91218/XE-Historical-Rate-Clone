import "./SelectDropdown.css";
import HISTORICAL_COUNTRIES_SELECTOR from "../Countries";
import { useId, useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export function SelectDropdown({ isOpen, onClose, handleCurrency }) {
  const dropdownRef = useRef();

  const inputid = useId();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflowY = "auto";
    };
  }, [isOpen, onClose]);

  const [inputSearchCountries, setSearchCountries] = useState("");

  const inputSearchCountriesRef = useRef();

  const filteredCountries = Object.entries(
    HISTORICAL_COUNTRIES_SELECTOR.HISTORICAL_COUNTRIES_SELECTOR
  ).filter(([key]) =>
    `${key}`.toLowerCase().includes(inputSearchCountries.toLowerCase())
  );

  const getFlag = (country) => {
    if (country === "EUR") {
      return `https://www.xe.com/svgs/flags/eur.static.svg`;
    } else {
      return `https://flagsapi.com/${country.substring(0, 2)}/flat/64.png`;
    }
  };

  useEffect(() => {
    inputSearchCountries.current?.focus();
  }, [isOpen, inputSearchCountries]);

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize(); // inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`dropdown-container ${
        isMobileView ? "fullscreen-dropdown" : ""
      }`}
      ref={dropdownRef}
    >
      <div className="containerclose">
        <IoMdClose size="22" />
      </div>
      <input
        id={inputid}
        type="text"
        className="dropdown-input"
        placeholder="Type to search..."
        value={inputSearchCountries}
        onChange={(e) => setSearchCountries(e.target.value)}
        ref={inputSearchCountriesRef}
      />

      <div id="dropdown" className="dropdown dropdown-list">
        {inputSearchCountries.length >= 1 &&
          filteredCountries.map((country) => (
            <div
              className="country"
              key={country[0]}
              onClick={() => {
                handleCurrency(country[0]);
                onClose();
              }}
            >
              <img
                alt={`${country[0]} flag`}
                width="25px"
                src={getFlag(country[0])}
              />
              <p>{`${country}`}</p>
            </div>
          ))}
        {inputSearchCountries.length === 0 &&
          Object.entries(
            HISTORICAL_COUNTRIES_SELECTOR.HISTORICAL_COUNTRIES_SELECTOR
          ).map(([key, value]) => (
            <div
              className="country"
              key={key}
              onClick={() => {
                handleCurrency(key);
                onClose();
              }}
            >
              <img src={getFlag(key)} alt={`${key} flag`} width="25px" />
              <p>{`${key} ${value}`}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
