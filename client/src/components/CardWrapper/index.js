import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SimpleLineChart from '../SimpleLineChart';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
    .then(res => res.json())
    .then((data) => {
      console.log('oi');
      setData(data);
    })
    .catch(() => console.log('Erro'));
  }, []);

  return (
    <React.Fragment>
      <Card
      className={classes.root}
      variant="outlined">
        <CardContent>
          <SimpleLineChart
            data={data}
            style={{
                position: 'absolute', left: '60%', top: '40%'
            }} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
