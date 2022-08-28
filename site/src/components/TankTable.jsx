import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../scripts/api.js';
import TankTableRow from './TankTableRow';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import NewTank from './NewTank';

const TankTable = () => {
  const [rows, setRows] = useState();
  const [page, setPage] = useState(0);
  const [newDialogShown, setNewDialogShown] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const resp = await api.get(`/tank`);
      setRows(resp.data);
    };
    getData();
  }, []);


  const refreshTabData = async () => {
    const resp = await api.get(`/tank`);
    setNewDialogShown(false)
    setRows(resp.data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
      <NewTank show={newDialogShown} refreshTabData={refreshTabData} />
      <TableContainer component={Paper}>
        <Table aria-label="Table containing tanks">
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography>Tank Model</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Producer</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Side Number</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Current Mod</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Production</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Introduced</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Ammo Count</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Armor Thickness</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Created</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>Last Modified</Typography>
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
          <TableFooter>
            <IconButton onClick={() => (page === 0 ? null : setPage(page - 1))}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton onClick={() => setPage(page + 1)}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TankTable;
