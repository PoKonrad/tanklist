const getTomorrow = () => {
  const dateTomorrow = new Date();
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);
  return dateTomorrow;
};

const tankValidatorSchema = {
  productionYear: {
    isInt: {
      min: 1900,
      max: new Date().toJSON().slice(0, 4),
    },
    errorMessage: 'Date not in range',
  },
  introduced: {
    isBefore: '1969-12-31',
    isAfter: getTomorrow().toJSON().slice(0, 10),
  },
  ammoCount: {
    isInt: {
      min: 0,
    },
    errorMessage: 'Date not in range.',
  },
  armorThicknessFront: {
    isInt: {
      min: 0,
    },
    errorMessage: 'Number not in range.',
  },
  armorThicknessSide: {
    isInt: {
      min: 0,
    },
    errorMessage: 'Number not in range.',
  },
  armorThicknessBack: {
    isInt: {
      min: 0,
    },
    errorMessage: 'Number not in range.',
  },
  mileage: {
    isInt: {
      min: 0,
    },
    errorMessage: 'Number not in range.'
  },
};

export default tankValidatorSchema;
