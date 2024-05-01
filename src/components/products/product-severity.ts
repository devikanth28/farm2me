export const ProductSeverity = (num: number) => {
  switch (num) {
    case 0:
      return "danger";
    default:
      return "success";
  }
};
