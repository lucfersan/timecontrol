import { useCallback, useContext, useState } from 'react';

import { ModalContext } from '../../contexts/ModalContext';

import { Container, ModalContent, Form } from './styles';

const Modal: React.FC = () => {
  const { closeModal } = useContext(ModalContext);

  return (
    <Container>
      <ModalContent>
        <Form>
          <input type="time" name="beginning" />
          <input type="time" name="period" />

          <div>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
            <button type="submit">Adicionar</button>
          </div>
        </Form>
      </ModalContent>
    </Container>
  );
};

export default Modal;
