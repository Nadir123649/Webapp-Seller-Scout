import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SearchContextValue {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined
);

interface SearchStateProps {
  children: ReactNode;
}

const SearchState: React.FC<SearchStateProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
