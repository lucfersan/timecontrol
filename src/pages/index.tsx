import React, { useCallback, useEffect, useRef, useState } from 'react';

import Cookies from 'js-cookie';

import Input from '../components/Input';

import { Container, Table, Form } from '../styles/pages/Home';
import { GetServerSideProps } from 'next';

interface TimeProps {
  id: number;
  beginning: string;
  period: string;
  day: string;
  end: string;
}

interface HomeProps {
  times: TimeProps[];
}

function Home(props: HomeProps) {
  const [times, setTimes] = useState<TimeProps[]>([]);

  const formRef = useRef(null);

  useEffect(() => {
    setTimes(props.times);
  }, []);

  useEffect(() => {
    Cookies.set('times', times, {
      expires: 31536000,
    });
  }, [times]);

  const clearForm = useCallback(() => {
    if (!formRef.current) {
      return;
    }

    formRef.current.reset();
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
    let hours = Math.floor(totalMinutes / 60);

    // Fixes more than 24 hours
    // Ex: 27h would become 3AM in the other day
    if (hours >= 24) {
      hours -= 24;
    }

    const minutes = totalMinutes % 60;

    const addHoursZeroToFormat = hours < 10 ? '0' : '';
    const addMinutesZeroToFormat = minutes < 10 ? '0' : '';

    /**
     * Zero to format example
     *
     * if I have 18 hours and 5 minutes
     *
     * without zero to format => 18:5
     * with zero to format => 18:05
     */
    const end =
      addHoursZeroToFormat +
      String(hours) +
      ':' +
      addMinutesZeroToFormat +
      String(minutes);

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
    clearForm();
  }, []);

  const removeTime = useCallback(id => {
    const confirmation = confirm('Deseja mesmo deletar?');

    if (!confirmation) return;

    setTimes(currentTimes => currentTimes.filter(time => time.id !== id));
  }, []);

  return (
    <Container>
      <Form onSubmit={addTime} ref={formRef}>
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { times } = ctx.req.cookies;

  if (!times) {
    return {
      props: {
        times: [],
      },
    };
  }

  const parsedTimes = await JSON.parse(times);

  return {
    props: {
      times: parsedTimes,
    },
  };
};
