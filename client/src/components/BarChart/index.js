import React from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart
} from 'recharts';

import { CASES_COLOR, DEATHS_COLOR } from '../constants/colors'

export default function SimpleLineChart({ data }) {

  return (
    <React.Fragment>
      <ResponsiveContainer width="95%" height={300}>
        <BarChart
          data={data.weeks}
          margin={{
            top: 10, right: 10, left: 10, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{fontSize: 12}}/>
          <YAxis tick={{fontSize: 12}}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="weeklyCases" name="Total de Casos por Semana" fill={CASES_COLOR} />
          <Bar dataKey="weeklyDeaths" name="Total de Óbitos por Semana" fill={DEATHS_COLOR} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>

  );
}