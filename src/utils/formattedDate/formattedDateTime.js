import dayjs from 'dayjs';
import 'dayjs/locale/en';
function formattedDateTime(date) {
  const formattedDateTime =  dayjs(date).format('DD/MM/YYYY, HH:mm');
  return formattedDateTime;
}

export default formattedDateTime;
