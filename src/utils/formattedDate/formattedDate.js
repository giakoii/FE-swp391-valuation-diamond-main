import dayjs from 'dayjs'

function formattedDate(date){
    const shortDateFormat = dayjs(date).format("DD/MM/YYYY"); 
    return shortDateFormat
}

export default formattedDate;