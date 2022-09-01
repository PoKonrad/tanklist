import { TextField, Typography, Button, Collapse, Grid, Alert } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const EditTank = ({ placeholders, refreshTabData, handleFetch }) => {
  const [model, setModel] = useState(placeholders?.model);
  const [producer, setProducer] = useState(placeholders?.producer);
  const [sideNumber, setSideNumber] = useState(placeholders?.sideNumber);
  const [currentMod, setCurrentMod] = useState(placeholders?.currentMod);
  const [productionYear, setProductionYear] = useState(
    placeholders?.productionYear ? placeholders?.productionYear : new Date().toJSON().slice(0, 4)
  );
  const [introduced, setIntroduced] = useState(
    placeholders?.introduced ? placeholders?.introduced : new Date().toJSON().slice(0, 10)
  );
  const [ammoCount, setAmmoCount] = useState(placeholders?.ammoCount);
  const [mileage, setMileage] = useState(placeholders?.millage);
  const [armorFront, setArmorFront] = useState(placeholders?.armorFront);
  const [armorBack, setArmorBack] = useState(placeholders?.armorBack);
  const [armorSide, setArmorSide] = useState(placeholders?.armorSide);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    setError();
    setSuccess(false);
    e.preventDefault();
    try {
      await handleFetch({
        sideNumber: sideNumber,
        producer: producer,
        model: model,
        currentMod: currentMod,
        productionYear: productionYear,
        introduced: introduced,
        ammoCount: ammoCount,
        armorThicknessFront: armorFront,
        armorThicknessBack: armorBack,
        armorThicknessSide: armorSide,
        mileage: mileage
      });
      refreshTabData();
      handleOpenSuccess();
    } catch (error) {
      const errorJson = await error.json();
      setError(errorJson);
    }
  };

  const handleOpenSuccess = () => {
    setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000)
};

  return (
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
          {placeholders?.model ? `Edit ${placeholders?.model}` : 'Add a new tank'}
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
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                type="number"
                defaultValue={placeholders?.ammoCount}
                fullWidth
                onChange={(e) => setAmmoCount(e.target.value)}
              />
            </Grid>
            <Grid item xl={3}>
              <TextField
                label="Mileage"
                required
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                defaultValue={placeholders?.mileage}
                fullWidth
                onChange={(e) => setMileage(e.target.value)}
              />
            </Grid>
            <Grid item xl={4}>
              <TextField
                label="Armor Thickness Back"
                required
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                defaultValue={placeholders?.armorThicknessBack}
                fullWidth
                onChange={(e) => setArmorBack(e.target.value)}
              />
            </Grid>
            <Grid item xl={4}>
              <TextField
                label="Armor Thickness Front"
                required
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                defaultValue={placeholders?.armorThicknessFront}
                fullWidth
                onChange={(e) => setArmorFront(e.target.value)}
              />
            </Grid>
            <Grid item xl={4}>
              <TextField
                label="Armor Thickness Side"
                required
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                defaultValue={placeholders?.armorThicknessSide}
                fullWidth
                onChange={(e) => setArmorSide(e.target.value)}
              />
            </Grid>
            <Grid item xl={12}>
              <Button type="submit" variant="contained" fullWidth>
                Save changes
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Collapse in={error?.error} unmountOnExit>
          <Alert severity="error">{error?.message}</Alert>
        </Collapse>
        <Collapse in={success} unmountOnExit>
          <Alert severity="success">Successfully edited.</Alert>
        </Collapse>
      </Box>
  );
};

export default EditTank;
