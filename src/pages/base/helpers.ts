import { format } from 'date-fns';

export const getMonth = (abbr?: string) => {
  if (!abbr) {
    return format(new Date(), 'MM');
  }

  switch (abbr.toLowerCase()) {
    case 'jan':
      return '01';
    case 'feb':
      return '02';
    case 'mar':
      return '03';
    case 'apr':
      return '04';
    case 'may':
      return '05';
    case 'jun':
      return '06';
    case 'jul':
      return '07';
    case 'aug':
      return '08';
    case 'sep':
    case 'sept':
      return '09';
    case 'dec':
      return '12';
    default:
      throw new Error(`Unrecognized month "${abbr}"`);
  }
};
