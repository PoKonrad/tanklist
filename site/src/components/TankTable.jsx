import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../scripts/api.js';
import TankTableRow from './TankTableRow';
import AddIcon from '@mui/icons-material/Add';
import TankForm from './TankForm.jsx';

const TankTable = () => {
  const [rows, setRows] = useState();
  const [newDialogShown, setNewDialogShown] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const resp = await api.get(`/tanks`);
      setRows(resp.data);
    };
    getData();
  }, []);

  const refreshTabData = async () => {
    const resp = await api.get(`/tanks`);
    setNewDialogShown(false);
    setRows(resp.data);
  };

  const handleFetch = async (tankObject) => {
    await api.post('/tanks', tankObject);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Collapse in={newDialogShown} unmountOnExit>
        <TankForm refreshTabData={refreshTabData} handleFetch={handleFetch} />
      </Collapse>
      <TableContainer component={Paper}>
        <Table aria-label="Table containing tanks">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography>Tank Model</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Producer</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Side Number</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Current Mod</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Production</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Introduced</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Ammo Count</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Mileage</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Armor Thickness</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Created (GMT)</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Last Modified (GMT)</Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setNewDialogShown(!newDialogShown)}>
                  <AddIcon />
                  <Typography>Add</Typography>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ? rows.map((row) => (
                  <TankTableRow row={row} key={row.id} refreshTabData={refreshTabData} />
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TankTable;
