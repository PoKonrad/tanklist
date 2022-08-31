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
import EditTank from './TankForm';
import api from '../scripts/api';

const TankTableRow = ({ row, refreshTabData }) => {
  const [edit, setEdit] = useState(false);

  const handleEditButton = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tanks/${row.id}`);
      setDeleteDialog(false);
      await refreshTabData();
    } catch (error) {
      // To do
    }
  };

  const handleFetch = async (tankObject) => {
    await api.put(`/tanks/${row?.id}`, tankObject);
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
        <TableCell align="center">{row?.mileage}km</TableCell>
        <TableCell sx={{ maxWidth: '1rem' }} align="center">
          Back: {row?.armorThicknessBack}mm Front: {row?.armorThicknessFront}mm Side:{' '}
          {row?.armorThicknessSide}mm
        </TableCell>
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
        <TableCell style={{ paddingBlock: 0 }} colSpan={12}>
          <EditTank
            show={edit}
            placeholders={row}
            refreshTabData={refreshTabData}
            id={row.id}
            handleFetch={handleFetch}
          />
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
