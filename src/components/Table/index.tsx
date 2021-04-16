import { TableContainer } from './styles';

const Table: React.FC = () => {
  return (
    <TableContainer>
      <thead>
        <tr>
          <th>Início</th>
          <th>Período</th>
          <th>Encerramento</th>
        </tr>
      </thead>

      <tbody></tbody>
    </TableContainer>
  );
};

export default Table;
