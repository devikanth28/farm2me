export const calculateItemSum = (num1: number, num2: number) => {
  return num1 * num2;
};

export const calculateTotalTax = (num1: number, num2: number, num3: number) => {
  return calculateItemSum(num1, num2) * (num3 / 100);
};

export const calculateItemTotal = (
  num1: number,
  num2: number,
  num3: number,
  num4: number
) => {
  let total = calculateItemSum(num1, num2);
  return total <= 700 ? total + num3 + num4 + 0 : total + num3 + num4;
};
