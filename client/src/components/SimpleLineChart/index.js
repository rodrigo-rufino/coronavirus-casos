import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { CASES_COLOR, DEATHS_COLOR, ESTIMATIVE_COLOR } from '../constants/colors'

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
          <XAxis dataKey="data" tick={{fontSize: 12}}/>
          <YAxis tick={{fontSize: 12}}/>
          <Tooltip />
          <Legend />
          <Line name="Total de Casos" type="monotone" dataKey="totalCasos" stroke={CASES_COLOR} strokeWidth={2} activeDot={{ r: 5 }} dot={false}/>
          <Line name="Total de Óbitos" type="monotone" dataKey="totalObitos" stroke={DEATHS_COLOR} strokeWidth={2} dot={false}/>
          <Line name="Estimativa" type="monotone" dataKey="estimativa" stroke={ESTIMATIVE_COLOR} strokeDasharray="5 5" strokeWidth={1} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <InputSlider futureDays={futureDays}  futureDaysHandler={futureDaysHandler}/>
      </div>
    </React.Fragment>

  );
}