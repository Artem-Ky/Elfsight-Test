import styled from 'styled-components';
import { Logo } from './Logo';
import { Filters } from './HeaderFilters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
