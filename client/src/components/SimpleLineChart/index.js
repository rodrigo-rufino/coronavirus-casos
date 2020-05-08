import React, {  useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';

import InputSlider from '../InputSlider';

export default function SimpleLineChart(props) {

  const [data, setData] = useState({});
  const [estimative, setEstimative] = useState([]);
  const [futureDays, setFutureDays] = useState(0);
  
  useEffect(() => {
    if ( !data.values ) fetchData();
    estimateDays(futureDays);
  }, [data]);

  async function fetchData() {
    const apiCall = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city: props.city })
    });
    const apiData = await apiCall.json();
    setData(apiData);
  }

  function estimateDays(days) {
    if ( !days || !data || !data.values || !data.function ) return;
    
    let values  = [];

    const { a, b } = data.function;

    const totalDays = data.values.length;

    const lastDate = moment(data.values[totalDays - 1].data.split('/').join('-'), 'DD/MM/YYYY');

    for (let i = 0; i < days; i++) {
      values.push({
        data: lastDate.add(1, 'd').format('DD/MM/YYYY'),
        estimativa: parseFloat((a * Math.exp((totalDays + i) * b)).toFixed(2)),
      })
    }
    setEstimative(values);
  }

  function futureDaysHandler(futureDays) {
    setFutureDays(futureDays);
    estimateDays(futureDays);
  }

  return (
    <React.Fragment>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart
          data={data.values && [...data.values, ...estimative] }
          margin={{
            top: 10, right: 10, left: 10, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Line name="Total de Casos" type="monotone" dataKey="totalCasos" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 5 }} dot={false}/>
          <Line name="Total de Óbitos" type="monotone" dataKey="totalObitos" stroke="#82ca9d" strokeWidth={2} dot={false}/>
          <Line name="Estimativa" type="monotone" dataKey="estimativa" stroke="#a8a5e6" strokeDasharray="5 5" strokeWidth={1} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <InputSlider futureDays={futureDays}  futureDaysHandler={futureDaysHandler}/>
      </div>
    </React.Fragment>

  );
}