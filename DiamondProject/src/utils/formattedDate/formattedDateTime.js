import dayjs from 'dayjs';
import 'dayjs/locale/en';
function formattedDateTime(date) {
  const formattedDateTime =  dayjs(date).format('MM/DD/YYYY, HH:mm');
  return formattedDateTime;
}

export default formattedDateTime;
