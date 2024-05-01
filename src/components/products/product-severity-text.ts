export const ProductSeverityText = (num: number) => {
  switch (num) {
    case 0:
      return "Out-of-Stock";
    default:
      return "In-Stock";
  }
};
