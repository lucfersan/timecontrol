import styled from 'styled-components';

import { Form as UnformForm } from '@unform/web';

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

export const Table = styled.table`
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-collapse: collapse;
  overflow-x: auto;
  font-size: 1.5rem;

  td,
  th {
    border: 1px solid ${props => props.theme.colors.text};
    text-align: center;
    padding: 0.5rem;
  }

  th:nth-child(3),
  td:nth-child(3) {
    background-color: ${props => props.theme.colors.red};
    color: ${props => props.theme.colors.white};
  }

  img {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    display: block;
  }
`;

export const Form = styled(UnformForm)`
  margin-bottom: 5rem;

  input,
  button {
    font-size: 1.2rem;
    border: 0;
  }

  input {
    display: block;
    margin-bottom: 2rem;
    width: 25rem;
    height: 1.3rem;
    padding: 1.2rem 1rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s ease;
      margin: 0 auto;
      color: ${props => props.theme.colors.text};
      border: 1px solid ${props => props.theme.colors.text};
      background: ${props => props.theme.colors.white};
      width: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  @media (max-width: 500px) {
    input {
      width: 13rem;
    }

    div {
      flex-direction: column;

      button:first-child {
        margin-bottom: 0.5rem;
      }
    }
  }
`;
