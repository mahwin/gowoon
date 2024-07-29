import { useState, useCallback, useEffect } from "react";

export function useInput(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.currentTarget.value);
    },
    []
  );

  return { value, handleChange };
}
