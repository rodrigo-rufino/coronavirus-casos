import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from '../SimpleLineChart';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import NumbersCard from '../NumbersCard'
import styled from 'styled-components';

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

  useEffect(() => {
    if ( !data.values ) fetchData();
    estimateDays(futureDays);
  }, []);

  function estimateDays(days) {
    if (days === 0) {
      setEstimative([]);
      return;
    }

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
    console.log(values);
    setEstimative(values);
  }

  function futureDaysHandler(futureDays) {
    setFutureDays(futureDays);
    estimateDays(futureDays);
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
  }

  return (
    <React.Fragment>
      <Typography variant="h3" component="h2">
        {props.city}
      </Typography>
      <Grid container spacing={3}>
          <Grid item xs={4}>
            <NumbersCard
              value={(data.values && data.values[data.values.length - 1].totalCasos) || 0}
              title={'Casos'}
              color={"#d9a629"}
            />
          </Grid>
          <Grid item xs={4}>
            <NumbersCard
              value={(data.values && data.values[data.values.length - 1].totalObitos) || 0}
              title={'Óbitos'}
              color={"#ba2020"}
            />
          </Grid>
          <Grid item xs={4}>
            <NumbersCard
              value={(estimative.length === 0) ?
                ((data.values && data.values[data.values.length - 1].totalCasos) || 0) :
                Math.ceil(estimative[estimative.length -1].estimativa)}
              title={`Casos em ${futureDays} dia${(futureDays === 0 || futureDays === 1) ? '' : 's'}.`}
              color={"#273b8c"}
            />
          </Grid>
        </Grid>
      <StyledCard
      className={classes.root}
      variant="outlined">
        <CardContent>
          <SimpleLineChart
            city={'Pouso Alegre'}
            data={data}
            estimative={estimative}
            futureDays={futureDays}
            futureDaysHandler={futureDaysHandler}
          />
        </CardContent>
      </StyledCard>
    </React.Fragment>
  );
}
