import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider({ futureDaysHandler, futureDays, maxDays }) {
  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
    futureDaysHandler(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            max={maxDays}
            value={typeof futureDays === 'number' ? futureDays : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
      <Box component="p" fontSize={12} m={1}>
        { futureDays === 0 ?
          'Hoje' : 
          `Daqui a ${futureDays} dia${(futureDays === 0 || futureDays === 1) ? '' : 's'}.`
        }
        <br></br>
        (considerando crescimento exponencial)
      </Box>
    </div>
  );
}