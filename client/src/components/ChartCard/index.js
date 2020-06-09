import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from '../SimpleLineChart';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import NumbersCard from '../NumbersCard'
import BarChart from '../BarChart';
import styled from 'styled-components';
import { CASES_COLOR, DEATHS_COLOR, ESTIMATIVE_COLOR } from '../constants/colors'

const StyledCard = styled(Card)`
  margin-top: 20px;
`;

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  }
});

export default function ChartCard(props) {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [estimative, setEstimative] = useState([]);
  const [futureDays, setFutureDays] = useState(0);
  const [maxDays, setMaxDays] = useState(90);

  useEffect(() => {
    if ( !data.values ) fetchData();
  }, []);

  function estimateDays(days, apiData) {
    if (days === 0) {
      setEstimative([]);
      return;
    }

    if ( !days || !apiData || !apiData.values || !apiData.function ) return;
    

    let values  = [];

    const { a, b } = apiData.function;

    const totalDays = apiData.values.length;

    const lastDate = moment(apiData.values[totalDays - 1].data.split('/').join('-'), 'DD/MM/YYYY');

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
  }

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
    estimateDays(maxDays, apiData);
  }

  return (
    <React.Fragment>
      <Typography variant="h3" component="h2">
        {props.city}
      </Typography>
      <Grid container spacing={3}>
          <Grid item xs={4}>
            <NumbersCard
              value={(data.values && data.values[data.values.length - 1] && data.values[data.values.length - 1].totalCasos) || 0}
              title={'Casos'}
              color={CASES_COLOR}
            />
          </Grid>
          <Grid item xs={4}>
            <NumbersCard
              value={(data.values && data.values[data.values.length - 1] && data.values[data.values.length - 1].totalObitos) || 0}
              title={'Óbitos'}
              color={DEATHS_COLOR}
            />
          </Grid>
          <Grid item xs={4}>
            <NumbersCard
              value={(futureDays === 0) ?
                '-' :
                Math.ceil(estimative[futureDays - 1].estimativa)}
              title={(futureDays === 0) ?
                      'Estimativa' :
                      `Casos em ${futureDays} dia${(futureDays === 0 || futureDays === 1) ? '' : 's'}.` }
              color={ESTIMATIVE_COLOR}
            />
          </Grid>
        </Grid>
      <StyledCard
      className={classes.root}
      variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Casos e Óbitos por dia
          </Typography>
          <SimpleLineChart
            city={props.city}
            data={data}
            estimative={estimative.slice(0, futureDays)}
            futureDays={futureDays}
            futureDaysHandler={futureDaysHandler}
            maxDays={maxDays}
          />
          <Typography variant="h5" component="h2">
            Casos e Óbitos por semana
          </Typography>
          <BarChart
            city={props.city}
            data={data}
          />
        </CardContent>
      </StyledCard>
    </React.Fragment>
  );
}
