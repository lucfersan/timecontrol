import React, { useCallback, useEffect, useRef, useState } from 'react';

import Cookies from 'js-cookie';

import Input from '../components/Input';

import { Container, Table, Form } from '../styles/pages/Home';
import { GetServerSideProps } from 'next';

interface TimeProps {
  id: number;
  hours: string;
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

  const formatWithZero = useCallback((time: number): string => {
    return time < 10 ? '0' : '';
  }, [])

  const addTime = useCallback(data => {
    if ((!data.hours && !data.minutes) || (data.hours < 1 && !data.minutes)) return;

    let dataHours = data.hours
    let dataMinutes = data.minutes

    // Fix data.minutes values like 00000
    if (data.hours < 1 || !data.hours) dataHours = 0
    if (data.minutes < 1 || !data.minutes) dataMinutes = 0

    const date = new Date();
    
    const now = date.getHours() * 60 + date.getMinutes();
    const periodInMinutes = Number(dataHours) * 60 + Number(dataMinutes);
    
    const totalMinutes = now + periodInMinutes;
    let hours = Math.floor(totalMinutes / 60);

    // Fixes more than 24 hours
    // Ex: 27h would become 3AM in the other day
    if (hours >= 24) {
      hours -= 24;
    }

    const minutes = totalMinutes % 60;
    
    const beginning = formatWithZero(date.getHours()) + String(date.getHours()) + ':' + formatWithZero(date.getMinutes()) + String(date.getMinutes());
    const period = formatWithZero(dataHours) + String(dataHours) + ':' + formatWithZero(dataMinutes) + String(dataMinutes);
    const end = formatWithZero(hours) + String(hours) + ':' + formatWithZero(minutes) + String(minutes);

    // Date
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    const today = dd + '/' + mm + '/' + yyyy;

    const time = {
      id: Date.now(),
      hours: beginning,
      period,
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
        <div>
          <Input placeholder="Horas" type="number" name="hours" id="hours" min="0" max="23" />
          <Input placeholder="Minutos" type="number" name="minutes" id="minutes" min="0" max="59" />
        </div>

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
              <td>{time.hours}</td>
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
