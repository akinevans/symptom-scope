export const formatFullDate = (date: string): string => {
  console.log(date);
  // FORMAT: MM DD, YYYY
  const yearNum: string = date.substring(0, 4);
  const monthNum: string = date.substring(5, 7);
  const dayNum: string = date.substring(8, 10);

  return `${formatMonth(monthNum)} ${dayNum}, ${yearNum}`;
};

export const formatMonth = (monthNum: string): string => {
  // Abbreviate month
  let monthName: string = '';

  switch (monthNum) {
    case '01':
      monthName = 'JAN';
      break;
    case '02':
      monthName = 'FEB';
      break;
    case '03':
      monthName = 'MAR';
      break;
    case '04':
      monthName = 'APR';
      break;
    case '05':
      monthName = 'MAY';
      break;
    case '06':
      monthName = 'JUN';
      break;
    case '07':
      monthName = 'JUL';
      break;
    case '08':
      monthName = 'AUG';
      break;
    case '09':
      monthName = 'SEP';
      break;
    case '10':
      monthName = 'OCT';
      break;
    case '11':
      monthName = 'NOV';
      break;
    case '12':
      monthName = 'DEC';
      break;

    default:
      console.log('Invalid month abbreviation');
  }
  return monthName;
};
