import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-top: 20px;
`;

export default function NumbersCard({value, title, color}) {
  return (
    <StyledCard variant="outlined">
      <CardContent style={{ padding: 3 }}>
        <Typography variant="h3" component="h2" style={{color}}>
          <Box fontWeight="fontWeightBold" m={1}>
            {value}
          </Box>
        </Typography>
        <Typography variant="body2" component="h2">
          {title}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}