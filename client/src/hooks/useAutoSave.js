import React, { useCallback, useEffect, useState, SetStateAction } from "react";
import debounce from "lodash.debounce";

import { LOCAL_STORAGE_KEY } from "./App";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

export default function useAutosave(dataToSave) {
  // This UI state mirrors what's in the database.
  const [data, setData] = useState(dataToSave);

  // This is the side effect we want to run on users' changes.
  // It is responsible for persisting the changes in the database.
  // In this example, we use localStorage for simplicity.
  const saveData = useCallback((newData) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    setData(newData);
    console.log("Saved successfully!");
  }, []);

  const debouncedSave = useCallback(
    debounce(async (newData) => {
      saveData(newData);
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  // This effect runs only when `data` changes.
  // Effectively achieving the auto-save functionality we wanted.
  useEffect(() => {
    if (data) {
      debouncedSave(data);
    }
  }, [data, debouncedSave]);

  return [data, setData];
}
