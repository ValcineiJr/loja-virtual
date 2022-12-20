const formatter = (value: number) => {
  return new Intl.NumberFormat(`pt-BR`, {
    style: `currency`,
    currency: `BRL`,
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  }).format(value);
};

export default formatter;
