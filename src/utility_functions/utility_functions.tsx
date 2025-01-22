export const formatFullDate = (date: string): string => {
  // console.log(date);
  // FORMAT: MM DD, YYYY
  const yearNum: string = date.substring(0, 4);
  const monthNum: string = date.substring(5, 7);
  const dayNum: string = date.substring(8, 10);

  return `${formatMonth(monthNum)} ${dayNum}, ${yearNum}`;
};

//formats month number as STRING  to abbreviation
// example "01" = JAN
export const formatMonth = (monthNum): string => {
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

// translate month of type NUMBER, to abbreviation
//  01 = JAN, 12 = DEC
export const monthNumToWord = (month: number) => {
  switch (month) {
    case 1:
      return 'JAN';
    case 2:
      return 'FEB';
    case 3:
      return 'MAR';
    case 4:
      return 'APR';
    case 5:
      return 'MAY';
    case 6:
      return 'JUN';
    case 7:
      return 'JUL';
    case 8:
      return 'AUG';
    case 9:
      return 'SEP';
    case 10:
      return 'OCT';
    case 11:
      return 'NOV';
    case 12:
      return 'DEC';
    default:
      return 'Invalid month';
  }
};

export const generateTrackedList = (
  symptom: any[],
  keys: string[]
): string[] => {
  const capitalizeString = (text: string): string =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const trackedItems = new Set<string>();

  symptom.forEach((s) =>
    keys.forEach((key) => {
      if (s[key]) trackedItems.add(capitalizeString(s[key]));
    })
  );
  // sort the list in alphabetical order, then return
  return Array.from(trackedItems).sort();
};

export const getSeverityBadge = (value: number): string[] => {
  const severities = [
    { title: 'Mild', color: 'text-[#2D5101] bg-[#C0DD78]', range: [1, 3] },
    {
      title: 'Moderate',
      color: 'text-[#6D3A00] bg-[#F5CD6F]',
      range: [4, 6],
    },
    { title: 'Severe', color: 'text-[#81371E] bg-[#F3C6BA]', range: [7, 8] },
    {
      title: 'Very Severe',
      color: 'text-[#8C161E] bg-[#FFC3C9]',
      range: [9, 10],
    },
    {
      title: 'Error',
      color: 'text-[#000] bg-[#EEE]',
      range: [11, 100],
    },
  ];

  for (const severity of severities) {
    if (value >= severity.range[0] && value <= severity.range[1]) {
      return [severity.title, severity.color];
    }
  }

  // Error badge
  return [severities[4].title, severities[4].color];
};
