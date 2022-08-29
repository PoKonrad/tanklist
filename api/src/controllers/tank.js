import tankModel from '../models/tanks.model.js';
import authMiddleware from '../middleware/auth.js';
import 'express-async-errors';
import { Router } from 'express';

const router = Router();
router.use(authMiddleware);

// New
router.post('/new', async (req, res) => {
  const tankData = req.body;

  await tankModel.create({
    sideNumber: tankData.sideNumber,
    producer: tankData.producer,
    model: tankData.model,
    currentMod: tankData.currentMod,
    productionYear: parseInt(tankData.productionYear),
    introduced: tankData.introduced,
    ammoCount: parseInt(tankData.ammoCount),
    armorThicknessFront: tankData.armorThicknessFront,
    armorThicknessSide: tankData.armorThicknessSide,
    armorThicknessBack: tankData.armorThicknessBack,
    mileage: tankData.mileage
  });

  return res.status(200).json({
    error: false,
    message: 'Tank added successfully',
  });
});

// Get
router.get('/', async (req, res) => {
  const tanks = await tankModel.findAll();

  res.status(200).json({
    error: 'false',
    data: tanks,
  });
});

// Delete
router.post('/:id/delete', async (req, res) => {
  const tankId = req.params.id;

  await tankModel.destroy({
    where: {
      id: tankId,
    },
  });

  res.status(200).json({
    error: false,
    message: 'Deleted successfully',
  });
});

// Edit
router.post('/:id/edit', async (req, res) => {
  const tankId = req.params.id;
  const tankData = req.body;

  const newTank = {
    sideNumber: tankData.sideNumber,
    producer: tankData.producer,
    model: tankData.model,
    currentMod: tankData.currentMod,
    productionYear: tankData.productionYear,
    introduced: tankData.intrudiction,
    ammoCount: tankData.ammoCount,
    armorThicknessFront: tankData.armorThicknessFront,
    armorThicknessSide: tankData.armorThicknessSide,
    armorThicknessBack: tankData.armorThicknessBack,
    mileage: tankData.mileage
  };
  await tankModel.update(newTank, {
    where: {
      id: tankId,
    },
  });

  res.status(200).json({
    error: false,
    message: 'Edited successfully',
  });
});

export default router;
