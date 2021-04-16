import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(149, 150, 151, 0.9);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Form = styled.form`
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
