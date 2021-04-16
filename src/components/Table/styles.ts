import styled from 'styled-components';

export const TableContainer = styled.table`
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-collapse: collapse;

  td,
  th {
    border: 1px solid ${props => props.theme.colors.text};
    text-align: left;
    padding: 0.5rem;
  }
`;
