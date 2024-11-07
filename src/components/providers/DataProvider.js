import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParamString = params.get('page');
    const pageParamInteger = parseInt(pageParamString, 10);
    setActivePage(isNaN(pageParamInteger) ? 0 : pageParamInteger - 1);

    const newFilters = {
      name: params.get('name') || '',
      status: params.get('status') || '',
      species: params.get('species') || '',
      type: params.get('type') || '',
      gender: params.get('gender') || ''
    };
    setFilters(newFilters);

    const newApiURL = `${API_URL}?${params.toString()}`;
    setApiURL(newApiURL);
  }, []);

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  };

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      filters,
      setFilters,
      isFetching,
      isError,
      info
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      filters,
      setFilters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
