import {
  TableCell,
  IconButton,
  ButtonGroup,
  TableRow,
  Dialog,
  DialogTitle,
  Button,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import EditTank from './EditTank';
import api from '../scripts/api';

const TankTableRow = ({ row, refreshTabData }) => {
  const [edit, setEdit] = useState(false);

  const handleEditButton = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    try {
      await api.post(`/tank/${row.id}/delete`);
      setDeleteDialog(false);
      await refreshTabData();
    } catch (error) {
      // To do
    }
  };
  const [deleteDialog, setDeleteDialog] = useState(false);
  return (
    <>
      <TableRow key={row?.id}>
        <TableCell align="center">{row?.model}</TableCell>
        <TableCell align="center">{row?.producer}</TableCell>
        <TableCell align="center">{row?.sideNumber}</TableCell>
        <TableCell align="center">{row?.currentMod}</TableCell>
        <TableCell align="center">{row?.productionYear}</TableCell>
        <TableCell align="center">{row?.introduced}</TableCell>
        <TableCell align="center">{row?.ammoCount}</TableCell>
        <TableCell align="center">{row?.armorThickness}</TableCell>
        <TableCell align="center">
          {`${row?.createdAt.slice(0, 10)} ${row?.createdAt.slice(11, 19)}`}
        </TableCell>
        <TableCell align="center">
          {`${row?.updatedAt.slice(0, 10)} ${row?.updatedAt.slice(11, 19)}`}
        </TableCell>
        <TableCell sx={{ p: '0.5rem' }} align="right">
          <ButtonGroup>
            <IconButton onClick={handleEditButton}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setDeleteDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <EditTank show={edit} placeholders={row} refreshTabData={refreshTabData} id={row.id} />
        </TableCell>
      </TableRow>

      <Dialog open={deleteDialog}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            onClick={() => {
              setDeleteDialog(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TankTableRow;
