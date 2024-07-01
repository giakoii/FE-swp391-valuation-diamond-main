function getColorTime(orderDate, receivedDate){
    const now = new Date()
    const orderDateTime = new Date(orderDate)
    const receivedDateTime = new Date(receivedDate)

    const totalTime  = receivedDateTime - orderDateTime;
    const takenTime = now  - orderDateTime
    if(receivedDateTime < now){
        return '#FF7A7A'
    }else if(takenTime <= totalTime/2){
        return '#ACE6AE'
    }else{
        return '#FFE77A'
    }
}
export default getColorTime