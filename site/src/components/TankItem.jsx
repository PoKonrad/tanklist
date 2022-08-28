import {
  List,
  ListItemButton,
  Grid,
  Typography,
  ListItemIcon
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreTankData from './MoreTankData';
import React from 'react';

const TankItem = ({ data }) => {
  return (
    <ListItemButton key={data.id}>
      <ListItemIcon>
        <KeyboardArrowDownIcon />
      </ListItemIcon>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Typography textAlign="center"> {data.model} </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography textAlign="center"> {data.producer} </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography textAlign="center"> {data.currentMod} </Typography>
          </Grid>
        </Grid>
      <List component="div" disablePadding>
        <MoreTankData data={data} />
      </List>
    </ListItemButton>
  );
};

export default TankItem;
