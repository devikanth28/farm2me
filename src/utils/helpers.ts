import CommonConstant from "../constants/common.constant";

const ConsoleLog = (message: any, data?: string) => {
  if (`${process.env.ENVIRONMENT}` == CommonConstant.localEnvironemt) {
    if (data) console.log(message, data);
    else console.log(message, data);
  }
};

const ConsoleLogError = (message: any, data?: string) => {
  if (`${process.env.ENVIRONMENT}` == CommonConstant.localEnvironemt) {
    if (data) console.error(message, data);
    else console.error(message, data);
  }
};

const getDeviceName = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "TAB";
  } else if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "MOBILE";
  } else {
    return "PC";
  }
};

const formatString = (format: string, ...args: any[]): string => {
  return format.replace(/{(\d+)}/g, (match, index) => {
    const argIndex = parseInt(index, 10);
    return args[argIndex] !== undefined ? args[argIndex].toString() : match;
  });
};

const isFormFieldInvalid = (name: any, form: any) =>
  !!(form.touched[name] && form.errors[name]);

const getFormErrorMessage = (name: any, form: any) => {
  return isFormFieldInvalid(name, form)
    ? '<small className="p-error">' + form.errors[name] + "</small>"
    : '<small className="p-error">&nbsp;</small>';
};

const getNext7Days = () => {
  const today = new Date();
  let next7Days = "";

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 7);
  next7Days = nextDay.toDateString();

  return next7Days;
};

const getNext7DaysByDate = (date: Date) => {
  let next7Days = "";

  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 7);
  next7Days = nextDay.toDateString();

  return next7Days;
};

const formatAmountInINR = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
};

const Helpers = {
  ConsoleLog,
  ConsoleLogError,
  getDeviceName,
  getNext7Days,
  formatString,
  formatAmountInINR,
  getFormErrorMessage,
  getNext7DaysByDate,
};

export default Helpers;
