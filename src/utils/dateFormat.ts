import moment from 'moment-timezone';

const inputDateString = new Date;
const inputFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

// Parse the input date string in UTC time
const parsedDate = moment.utc(inputDateString, inputFormat);

// Convert to India Standard Time (IST)
const istDate = parsedDate.tz('Asia/Kolkata');

// Format the date in the desired format
export const formattedDate = istDate.format('YYYY-MM-DD HH:mm');
