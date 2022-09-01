import tankModel from '../models/tanks.model.js';
import authMiddleware from '../middleware/auth.js';
import 'express-async-errors';
import { Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import tankValidatorSchema from '../validatorSchemas/tankSchema.js'

const router = Router();
router.use(authMiddleware);

// New
router.post('/', checkSchema(tankValidatorSchema), async (req, res) => {
  const tankData = req.body;

  const createdTankData = await tankModel.create({
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
    mileage: tankData.mileage,
  });

  return res.status(201).json({
    error: false,
    data: createdTankData,
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
router.delete('/:id', async (req, res) => {
  const tankId = req.params.id;

  await tankModel.destroy({
    where: {
      id: tankId,
    },
  });

  res.sendStatus(204);
});

// Edit
router.put('/:id', checkSchema(tankValidatorSchema), async (req, res) => {
  const tankId = req.params.id;
  const tankData = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({
      error: true,
      errors: errors,
    });
  }

  const targetTank = await tankModel.findOne({
    where: {
      id: tankId,
    },
  });

  if (!targetTank) {
    return res.sendStatus(404);
  }

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
    mileage: tankData.mileage,
  };
  const editedTankData = await tankModel.update(newTank, {
    where: {
      id: tankId,
    },
  });

  res.status(200).json({
    error: false,
    data: editedTankData,
  });
});

export default router;
