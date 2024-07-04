import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


function formattedDateTime(date) {
  dayjs.extend(utc)
  const formattedDateTime =  dayjs(date).utc().format('DD/MM/YYYY, HH:mm');
  return formattedDateTime;
}

export default formattedDateTime;
