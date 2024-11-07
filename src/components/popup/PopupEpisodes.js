import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { Loader, Text } from '../common';
import { GetEpisodesState } from '../../services';

export function PopupEpisodes({ episodes }) {
  const [series, setSeries] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEpisodes = async () => {
      if (episodes?.length) {
        setIsFetching(true);
        const [data, error] = await GetEpisodesState(episodes);

        if (isMounted) {
          if (error) {
            setIsError(error);
          } else {
            setSeries(data);
          }
          setIsFetching(false);
        }
      }
    };

    fetchEpisodes();

    return () => {
      isMounted = false;
    };
  }, [episodes]);

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <Text>Error loading episodes</Text>;
  }

  return (
    <PopupEpisodesContainer>
      <Text>Participated in episodes:</Text>

      <StyledPopupEpisodes _length={series.length}>
        {series?.map(({ id, name, episode }) => (
          <Episode key={id} _length={series.length}>
            <EpisodeMarking>
              {episode
                .replace(/S0?(\d+)/, 'Season $1 - ')
                .replace(/E0?(\d+)/, 'Ep. $1')}
            </EpisodeMarking>
            {name}
          </Episode>
        ))}
      </StyledPopupEpisodes>
    </PopupEpisodesContainer>
  );
}

const PopupEpisodesContainer = styled.div``;

const StyledPopupEpisodes = styled.div`
  display: flex;
  flex-direction: column;

  ${({ _length }) =>
    _length > 20 &&
    css`
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(${Math.ceil(_length / 2)}, 1fr);

      & p {
        width: 95%;
        border-bottom: 2px solid #eee;
      }

      & span {
        margin-bottom: 0;
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${_length}, 1fr);

        & span {
          margin-bottom: 10px;
        }
      }
    `};
`;

const Episode = styled.p`
  width: 100%;
  display: grid;
  align-items: center;
  padding: 10px 0;
`;

const EpisodeMarking = styled.span`
  margin-bottom: 8px;
  color: #83bf46;
`;
