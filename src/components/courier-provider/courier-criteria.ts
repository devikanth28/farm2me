export const CriteriaChecker = (num: number) => {
  if (num >= 0 && num <= 5) {
    return "Up to 5 kgs";
  }
  if (num >= 6 && num <= 10) {
    return "5 to 10 kg";
  }
  if (num >= 11 && num <= 15) {
    return "10 to 15 kg";
  }
  if (num >= 16 && num <= 20) {
    return "15 to 20 kg";
  }
  if (num >= 21) {
    return "20 kg above";
  }
};
