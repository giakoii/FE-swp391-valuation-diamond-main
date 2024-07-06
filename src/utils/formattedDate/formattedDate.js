import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
function formattedDate(date){
    dayjs.extend(utc)
    const shortDateFormat = dayjs(date).format("DD/MM/YYYY"); 
    
    return shortDateFormat
}

export default formattedDate;