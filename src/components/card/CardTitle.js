import styled from 'styled-components';
import { GenderIcon } from './GenderIcon';

export function CardTitle({ name, gender, className }) {
  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>

      <GenderIcon gender={gender} />
    </CardTitleContainer>
  );
}

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledCardTitle = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;
