import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from '../providers';

export function Filters() {
  const { filters, setFilters, setApiURL, setActivePage } = useData();
  const [showFilters, setShowFilters] = useState(true);
  const API_URL = 'https://rickandmortyapi.com/api/character/';

  useEffect(() => {
    const savedVisibility = localStorage.getItem('showFilters');
    if (savedVisibility !== null) {
      setShowFilters(JSON.parse(savedVisibility));
    }
  }, []);

  const toggleFiltersVisibility = () => {
    const newVisibility = !showFilters;
    setShowFilters(newVisibility);
    localStorage.setItem('showFilters', JSON.stringify(newVisibility));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFiltersReset = (e) => {
    e.preventDefault();

    setFilters({
      name: '',
      status: '',
      species: '',
      type: '',
      gender: ''
    });

    const params = new URLSearchParams();

    setActivePage(0);

    const newApiURL = `${API_URL}?${params.toString()}`;
    setApiURL(newApiURL);

    const newUrl = `${window.location.pathname}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.set(key, filters[key]);
      }
    });

    setActivePage(0);

    const newApiURL = `${API_URL}?${params.toString()}`;
    setApiURL(newApiURL);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <>
      <Button type="button" onClick={toggleFiltersVisibility}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>
      {showFilters && (
        <FiltersContainer onSubmit={handleFilterSubmit}>
          <FilterGroups>
            <FilterGroup>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleInputChange}
              />
            </FilterGroup>
            <FilterGroup>
              <Label htmlFor="species">Species:</Label>
              <Input
                type="text"
                id="species"
                name="species"
                value={filters.species}
                onChange={handleInputChange}
              />
            </FilterGroup>
            <FilterGroup>
              <Label htmlFor="type">Type:</Label>
              <Input
                type="text"
                id="type"
                name="type"
                value={filters.type}
                onChange={handleInputChange}
              />
            </FilterGroup>
          </FilterGroups>
          <FilterGroups>
            <FilterGroup>
              <Label htmlFor="gender">Gender:</Label>
              <Select
                id="gender"
                name="gender"
                value={filters.gender}
                onChange={handleInputChange}
              >
                <option value="">All</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </Select>
            </FilterGroup>
            <FilterGroup>
              <Label htmlFor="status">Status:</Label>
              <Select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleInputChange}
              >
                <option value="">All</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </Select>
            </FilterGroup>
          </FilterGroups>
          <FilterGroups>
            <Button type="submit">Apply Filters</Button>
            <Button type="reset" onClick={handleFiltersReset}>
              Reset Filters
            </Button>
          </FilterGroups>
        </FiltersContainer>
      )}
    </>
  );
}

const FiltersContainer = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  background-color: #1b1b1b;
  border: 3px solid #00b5cc;
  gap: 20px;
  padding: 20px;
  border-radius: 15px;
`;

const FilterGroup = styled.div`
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FilterGroups = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Label = styled.label`
  display: block;
  color: #00ff9c;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  color: #000;
  border: 2px solid #00b5cc;
  border-radius: 25px;
  background-color: #e5ffde;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  color: #000;
  border: 2px solid #00b5cc;
  border-radius: 25px;
  font-size: 1rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #e5ffde;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='black' d='M10 12l-5-5h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 30px;
`;

const Button = styled.button`
  padding: 12px 36px;
  background-color: #83bf46;
  color: #fff;
  border: 2px solid #00b5cc;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #6ea337;
    border-color: #ffcc00;
  }
`;
