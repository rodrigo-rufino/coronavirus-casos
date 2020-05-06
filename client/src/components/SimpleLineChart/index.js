import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          data={this.props.data}
          margin={{
            top: 20, right: 20, left: 20, bottom: 20,
          }}
          style={{height: 1000}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Line name="Total de Casos" type="monotone" dataKey="totalCasos" stroke="#8884d8" activeDot={{ r: 5 }} dot={false}/>
          <Line name="Total de Óbitos" type="monotone" dataKey="totalObitos" stroke="#82ca9d" dot={false}/>
          <Line name="Estimativa" type="monotone" dataKey="estimativa" stroke="#b3d9ff" strokeDasharray="5 5" strokeWidth={1} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    );
  }
}