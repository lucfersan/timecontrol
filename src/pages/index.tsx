import React, { useCallback, useState } from 'react';

import Input from '../components/Input';

import { Container, Table, Form } from '../styles/pages/Home';

function Home() {
  const [times, setTimes] = useState([]);

  const clearForm = useCallback(() => {
    document.querySelector('form').reset();
  }, []);

  const addTime = useCallback(data => {
    if (!data.beginning) return;

    // If beginning = "09:10", then the array is [09, 10]
    const [a, b] = data.beginning.split(':');

    /**
     * Converting the number to minutes
     *
     * a is hours so I'm converting it to minutes
     * Ex: 9 => 9 * 60 = 540
     *
     * b is minutes, so I'm summing it up with a
     * Ex: 540 + 10 = 550
     */
    const firstNumber = Number(a) * 60 + Number(b);

    // By default the period is "9:30h" so in minutes this is 570
    const period = 570;

    const totalMinutes = firstNumber + period;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const addZeroToFormat = minutes < 10 ? '0' : '';

    /**
     * Zero to format example
     *
     * if I have 18 hours and 5 minutes
     *
     * without zero to format => 18:5
     * with zero to format => 18:05
     */
    const end = String(hours) + ':' + addZeroToFormat + String(minutes);

    // Date
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    const today = dd + '/' + mm + '/' + yyyy;

    const time = {
      id: Date.now(),
      beginning: data.beginning,
      period: '9:30',
      day: today,
      end,
    };

    setTimes(currentTimes => [time, ...currentTimes]);
  }, []);

  const removeTime = useCallback(id => {
    setTimes(currentTimes => currentTimes.filter(time => time.id !== id));
  }, []);

  return (
    <Container>
      <Form onSubmit={addTime}>
        <Input type="time" name="beginning" />

        <div>
          <button type="button" onClick={clearForm}>
            Cancelar
          </button>
          <button type="submit">Adicionar</button>
        </div>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Início</th>
            <th>Período</th>
            <th>Encerramento</th>
            <th>Dia</th>
            <th>Deletar</th>
          </tr>
        </thead>

        <tbody>
          {times.map(time => (
            <tr key={time.id}>
              <td>{time.beginning}</td>
              <td>{time.period}</td>
              <td>{time.end}</td>
              <td>{time.day}</td>
              <td>
                <img
                  onClick={() => removeTime(time.id)}
                  src="/delete.svg"
                  alt="Deletar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
