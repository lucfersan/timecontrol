import { useContext } from 'react';

import Table from '../components/Table';

import { ModalContext } from '../contexts/ModalContext';

import { Container } from '../styles/pages/Home';

const Home: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <Container>
      <button onClick={openModal}>Novo horário</button>

      <Table />
    </Container>
  );
};

export default Home;
