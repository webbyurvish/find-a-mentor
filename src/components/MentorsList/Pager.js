import styled from 'styled-components/macro';
import { useFilters } from '../../context/filtersContext/FiltersContext';
import { scrollToTop } from '../../helpers/window';
import { Button } from '../../Me/components/Button/Button';
import { useFilterParams } from '../../utils/permaLinkService';

const StyledPager = styled.div`
  gap: 5px;
  display: flex;
  margin: 20px 0 0;
  justify-content: center;
`;

export const Pager = ({ hasNext }) => {
  const [state, dispatch] = useFilters();
  const { setFilterParams } = useFilterParams();
  const { page } = state;

  const setPage = async (page) => {
    await scrollToTop(500);
    setFilterParams('page', page > 1 && page);
    dispatch({
      type: 'setPage',
      payload: page,
    });
  };

  return (
    <StyledPager>
      {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
      {hasNext && <Button onClick={() => setPage(page + 1)}>Next</Button>}
    </StyledPager>
  );
};
