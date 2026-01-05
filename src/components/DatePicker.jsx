import { Temporal } from "temporal-polyfill";
const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const todayISO = Temporal.Now.plainDateISO();
import { useState, useRef, useEffect, useId } from "react";

import "./DatePicker.css";

const monthsOptions = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const yearsOptions = Array.from(
  { length: 2025 - 1970 + 1 },
  (_, i) => 1970 + i
);

function getDaysInMonth(year, month) {
  return Temporal.PlainDate.from({ year: year, month: month, day: 1 })
    .daysInMonth;
}

export function DatePicker({ isOpen, onClose, handlePickDate }) {
  const monthsId = useId();

  const yearsId = useId();

  const datepickerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflowY = "auto";
    };
  }, [isOpen, onClose]);

  const today = Temporal.PlainDate.from({
    year: todayISO.year,
    month: todayISO.month,
    day: 1,
  });

  const [currentDate, setCurrentDate] = useState({
    firstDayIndex: today.dayOfWeek,
    day: today.day,
    month: today.month,
    year: today.year,
  });

  const previousMonth = () => {
    const calculateNextMonth = Temporal.PlainDate.from({
      year: currentDate.year,
      month: currentDate.month - 1,
      day: 1,
    });

    setCurrentDate((currentDate) => ({
      ...currentDate,
      day: calculateNextMonth.day,
      month: calculateNextMonth.month,
      year: calculateNextMonth.year,
      firstDayIndex: calculateNextMonth.dayOfWeek,
    }));
  };

  const nextMonth = () => {
    if (currentDate.month === 12) return;

    const calculateNextMonth = Temporal.PlainDate.from({
      year: currentDate.year,
      month: currentDate.month + 1,
      day: 1,
    });

    setCurrentDate((currentDate) => ({
      ...currentDate,
      day: calculateNextMonth.day,
      month: calculateNextMonth.month,
      year: calculateNextMonth.year,
      firstDayIndex: calculateNextMonth.dayOfWeek,
    }));
  };

  const blanks = Array.from({ length: currentDate.firstDayIndex });
  const days = Array.from(
    { length: getDaysInMonth(currentDate.year, currentDate.month) },
    (_, i) => i + 1
  );
  const calendarCells = [...blanks, ...days];

  const groupIntoWeeks = (cells) => {
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }

    return weeks;
  };

  const daysInMonthSliced = groupIntoWeeks(calendarCells);

  const handleMonthsChange = (e) => {
    const getMonth = Temporal.PlainDate.from({
      year: currentDate.year,
      month: Number(e.target.value),
      day: 1,
    });
    setCurrentDate((currentDate) => ({
      ...currentDate,
      day: getMonth.day,
      month: getMonth.month,
      year: getMonth.year,
      firstDayIndex: getMonth.dayOfWeek,
    }));
  };

  const handleYearsChange = (e) => {
    const getYear = Temporal.PlainDate.from({
      year: Number(e.target.value),
      month: currentDate.year,
      day: 1,
    });
    setCurrentDate((currentDate) => ({
      ...currentDate,
      day: getYear.day,
      month: getYear.month,
      year: getYear.year,
      firstDayIndex: getYear.dayOfWeek,
    }));
  };

  return (
    <div className="content-wrapper">
      <div className="open">
        <div className="box-container">
          <div className="align-container" ref={datepickerRef}>
            <nav>
              <button
                id="prev-month-btn"
                type="button"
                aria-label="Go to the Previous Month"
                onClick={previousMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
                </svg>
              </button>
              <button
                id="next-month-btn"
                type="button"
                aria-label="Go to the Next Month"
                onClick={nextMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                </svg>
              </button>
            </nav>
            <div className="container-content">
              <div className="box-header">
                <div className="container-select">
                  <span className="span-container-select">
                    <select
                      id={monthsId}
                      onChange={(e) => handleMonthsChange(e)}
                      className="currency-dropdown"
                      value={currentDate.month}
                    >
                      {Object.entries(monthsOptions).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <span className="span-icon">
                      {monthsOptions[currentDate.month]}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                      </svg>
                    </span>
                  </span>
                  <span className="span-container-select">
                    <select
                      id={yearsId}
                      onChange={(e) => handleYearsChange(e)}
                      className="currency-dropdown"
                      value={currentDate.year}
                    >
                      {yearsOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <span className="span-icon">
                      {currentDate.year}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                      </svg>
                    </span>
                  </span>
                  <span id="span-status" role="status">
                    {monthsOptions[currentDate.month]}
                  </span>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    {weekdays.map((day) => (
                      <th className="weekdays" key={day}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysInMonthSliced.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                      {week.map((day, index) => (
                        <td key={index}>
                          {day && (
                            <button
                              className={`${
                                !day ||
                                isDisabledDate(
                                  currentDate.year,
                                  currentDate.month,
                                  day
                                )
                                  ? "disabled"
                                  : ""
                              }`}
                              onClick={() => {
                                if (!day) return;

                                const disabled = isDisabledDate(
                                  currentDate.year,
                                  currentDate.month,
                                  day
                                );
                                if (disabled) return;
                                handlePickDate(
                                  day,
                                  currentDate.month,
                                  currentDate.year
                                );
                                onClose();
                              }}
                            >
                              {day || ""}
                            </button>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
