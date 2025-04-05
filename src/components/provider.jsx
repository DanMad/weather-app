import { createContext, useMemo, useState } from 'react';

const Context = createContext();

function Provider({ children }) {
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const value = useMemo(() => {
    return {
      error,
      forecast,
      isReady,
      setError,
      setForecast,
      setIsReady,
    };
  }, [error, forecast, isReady]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.displayName = 'Provider';

export default Provider;
export { Context };
