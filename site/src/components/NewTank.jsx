import { TextField, Typography, Button, Collapse, Grid, Alert } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import api from '../scripts/api';

const NewTank = ({ show, refreshTabData }) => {
  const [model, setModel] = useState();
  const [producer, setProducer] = useState();
  const [sideNumber, setSideNumber] = useState();
  const [currentMod, setCurrentMod] = useState();
  const [productionYear, setProductionYear] = useState(new Date().toJSON().slice(0, 4));
  const [introduced, setIntroduced] = useState(new Date().toJSON().slice(0, 10));
  const [ammoCount, setAmmoCount] = useState();
  const [armor, setArmor] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    try {
      await api.post(`/tank/new`, {
        sideNumber: sideNumber,
        producer: producer,
        model: model,
        currentMod: currentMod,
        productionYear: productionYear,
        introduced: introduced,
        ammoCount: ammoCount,
        armorThickness: armor
      });
      refreshTabData();
    } catch (error) {
      const errorMessage = await error.json();
      // To do
      setError(errorMessage);
    }
  };

  return (
    <Collapse in={show}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
          Add a new tank
        </Typography>
        <Box
          component={'form'}
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xl={3}>
              <TextField
                label="Tank Model"
                required
                fullWidth
                onChange={(e) => setModel(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Producer"
                required
                fullWidth
                onChange={(e) => setProducer(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Side Number"
                required
                fullWidth
                onChange={(e) => setSideNumber(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Current Mod"
                required
                fullWidth
                onChange={(e) => setCurrentMod(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Production Year"
                required
                type="number"
                InputProps={{
                  inputProps: {
                    min: '1900',
                    max: new Date().toJSON().slice(0, 4)
                  }
                }}
                defaultValue={new Date().toJSON().slice(0, 4)}
                fullWidth
                onChange={(e) => setProductionYear(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Introduced"
                required
                type="Date"
                defaultValue={new Date().toJSON().slice(0, 10)}
                fullWidth
                onChange={(e) => setIntroduced(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Ammo Count"
                required
                type="number"
                fullWidth
                onChange={(e) => setAmmoCount(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Armor Thickness"
                required
                type="number"
                fullWidth
                onChange={(e) => setArmor(e.target.value)}
              />
            </Grid>
            <Grid item xl={12}>
              <Button type="submit" variant="contained" fullWidth endIcon={<AddIcon />}>
                Add
              </Button>
              <Collapse in={error?.error}>
                <Alert severity="error">{error?.message}</Alert>
              </Collapse>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Collapse>
  );
};

export default NewTank;
