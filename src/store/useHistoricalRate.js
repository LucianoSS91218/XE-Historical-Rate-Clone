import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Temporal } from "temporal-polyfill";

const now = Temporal.Now.plainDateISO();

export const useHistoricalRate = create()(
  devtools(
    (set) => ({
      selectedCurrency: "EUR",
      selectedDate: {
        day: now.day - 1,
        month: now.month,
        year: now.year,
      },

      handleCurrency: (payload) => {
        set(() => ({
          selectedCurrency: payload,
        }));
      },

      handleDateChange: (day, month, year) => {
        set(() => ({
          selectedDate: {
            day: day,
            month: month,
            year: year,
          },
        }));
      },
    }),
    {
      name: "historicalrate",
    }
  )
);
