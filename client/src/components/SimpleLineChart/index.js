import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import InputSlider from '../InputSlider';

export default function SimpleLineChart({ data, estimative, futureDaysHandler, futureDays }) {

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