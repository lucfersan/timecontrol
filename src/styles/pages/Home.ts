import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 5rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-bottom: 2rem;
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.colors.text};
    font-size: 1.1rem;
    font-weight: 500;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.white};
  }
`;
