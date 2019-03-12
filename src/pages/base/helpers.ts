import { startOfMonth } from 'date-fns';

export const getDate = (month?: string, year?: string) => {
  const date = startOfMonth(new Date());

  if (month) {
    date.setMonth(getMonth(month));
  }

  if (year) {
    date.setFullYear(+year);
  }

  return date;
};

const getMonth = (abbr: string) => {
  switch (abbr.toLowerCase()) {
    case 'jan':
      return 0;
    case 'feb':
      return 1;
    case 'mar':
      return 2;
    case 'apr':
      return 3;
    case 'may':
      return 4;
    case 'jun':
      return 5;
    case 'jul':
      return 6;
    case 'aug':
      return 7;
    case 'sep':
    case 'sept':
      return 8;
    case 'oct':
      return 9;
    case 'nov':
      return 10;
    case 'dec':
      return 11;
    default:
      throw new Error(`Unrecognized month "${abbr}"`);
  }
};
