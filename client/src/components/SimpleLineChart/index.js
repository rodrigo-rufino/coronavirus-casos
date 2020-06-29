import React from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { CASES_COLOR, DEATHS_COLOR, ESTIMATIVE_COLOR, RECOVERED_COLOR } from '../constants/colors'

import InputSlider from '../InputSlider';

export default function SimpleLineChart({ data, estimative, futureDaysHandler, futureDays, maxDays }) {

  return (
    <React.Fragment>
      <ResponsiveContainer width="95%" height={300}>
        <ComposedChart
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
          <Line name="Total de Recuperados" type="monotone" dataKey="totalRecuperados" stroke={RECOVERED_COLOR} strokeWidth={2} activeDot={{ r: 5 }} dot={false}/>
          <Line name="Total de Casos" type="monotone" dataKey="totalCasos" stroke={CASES_COLOR} strokeWidth={2} activeDot={{ r: 5 }} dot={false}/>
          <Bar name="Novos Casos por dia" type="monotone" dataKey="novosCasos" fill={CASES_COLOR} barSize={20} stackId="casesDeaths"/>
          <Line name="Total de Óbitos" type="monotone" dataKey="totalObitos" stroke={DEATHS_COLOR} strokeWidth={2} dot={false}/>
          <Bar name="Novos Óbitos por dia" type="monotone" dataKey="novosObitos" fill={DEATHS_COLOR} barSize={20} stackId="casesDeaths"/>
          <Line name="Estimativa" type="monotone" dataKey="estimativa" stroke={ESTIMATIVE_COLOR} strokeDasharray="5 5" strokeWidth={1} dot={false}/>
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <InputSlider futureDays={futureDays}  futureDaysHandler={futureDaysHandler} maxDays={maxDays}/>
      </div>
    </React.Fragment>

  );
}