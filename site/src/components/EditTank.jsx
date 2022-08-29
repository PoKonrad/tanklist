import { TextField, Typography, Button, Collapse, Grid, Alert } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import api from '../scripts/api';

const EditTank = ({ show, placeholders, id, refreshTabData }) => {
  const [model, setModel] = useState(placeholders?.model);
  const [producer, setProducer] = useState(placeholders?.producer);
  const [sideNumber, setSideNumber] = useState(placeholders?.sideNumber);
  const [currentMod, setCurrentMod] = useState(placeholders?.currentMod);
  const [productionYear, setProductionYear] = useState(placeholders?.productionYear);
  const [introduced, setIntroduced] = useState(placeholders?.introduced);
  const [ammoCount, setAmmoCount] = useState(placeholders?.ammoCount);
  const [armor, setArmor] = useState(placeholders?.armor);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    setError();
    setSuccess(false)
    e.preventDefault();
    try {
      await api.post(`/tank/${id}/edit`, {
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
      setSuccess(true)
    } catch (error) {
      const errorJson = await error.json();
      setError(errorJson);
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
          Edit {placeholders?.model}.
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
                defaultValue={placeholders?.model}
                fullWidth
                onChange={(e) => setModel(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Producer"
                required
                defaultValue={placeholders?.producer}
                fullWidth
                onChange={(e) => setProducer(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Side Number"
                required
                defaultValue={placeholders?.sideNumber}
                fullWidth
                onChange={(e) => setSideNumber(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Current Mod"
                required
                defaultValue={placeholders?.currentMod}
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
                InputProps={{
                  inputProps: {
                    min: '1970-01-01',
                    max: new Date().toJSON().slice(0, 10)
                  }
                }}
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
                defaultValue={placeholders?.ammoCount}
                fullWidth
                onChange={(e) => setAmmoCount(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Armor Thickness"
                required
                defaultValue={placeholders?.armorThickness}
                fullWidth
                onChange={(e) => setArmor(e.target.value)}
              />
            </Grid>
            <Grid item xl={12}>
              <Button type="submit" variant="contained" fullWidth>
                Save changes
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Collapse in={error?.error}>
          <Alert severity="error">{error?.message}</Alert>
        </Collapse>
        <Collapse in={success}>
          <Alert severity="success">Successfully edited.</Alert>
        </Collapse>
      </Box>
    </Collapse>
  );
};

export default EditTank;
