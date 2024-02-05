import React, {createContext, useContext, useState} from 'react';

type FilterProviderProps = {
  children: React.ReactNode;
};

interface FilterContextType {
  filterCriteria: {
    type?: string;
    vendor?: string;
    orderBy?: string;
    orderDirection?: string;
  };
  setFilterCriteria: React.Dispatch<
    React.SetStateAction<{
      type?: string;
      vendor?: string;
      orderBy?: string;
      orderDirection?: string;
    }>
  >;
}

const defaultContextValue: FilterContextType = {
  filterCriteria: {},
  setFilterCriteria: () => {},
};

const FilterContext = createContext<FilterContextType>(defaultContextValue);

export const useFilter = () => useContext(FilterContext);

export const FilterProvider: React.FC<FilterProviderProps> = ({children}) => {
  const [filterCriteria, setFilterCriteria] = useState({});

  const value = {
    filterCriteria,
    setFilterCriteria,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
