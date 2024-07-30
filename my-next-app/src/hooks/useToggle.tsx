import { useState, useCallback, useEffect } from "react";

const none = () => {};

export function useToggle(initialStateFn: Function, handler: Function = none) {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const initToggle = initialStateFn();
    setToggle(initToggle);
    handler(initToggle);
  }, []);

  const setter = useCallback(() => {
    const newToggle = !toggle;
    handler(newToggle);
    setToggle(newToggle);
  }, [toggle, handler]);

  return { toggle, setter };
}
