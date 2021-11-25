import { useMemo, useState } from 'react';

export default function useBoolean(bool) {
  const [val, setVal] = useState(bool);

  const fns = useMemo(
    () => ({
      on() {
        setVal(true);
      },
      off() {
        setVal(false);
      },
      toggle() {
        setVal(val => !val);
      }
    }),
    []
  );

  return [val, fns];
}
