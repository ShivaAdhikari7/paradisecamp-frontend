import React, { useCallback, useState } from 'react';

import LoadingContext from './loading-context';

const LoadingContextProvider = props => {
  const [isLoading, setIsLoading] = useState(false);

  const loadingHandler = useCallback(
    loadingState => {
      setIsLoading(loadingState);
    },
    [setIsLoading]
  );

  const loadingContext = {
    isLoading,
    setIsLoading: loadingHandler,
  };

  return (
    <LoadingContext.Provider value={loadingContext}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
