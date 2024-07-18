const getExpiredDateMax = (orderDetails) =>{
    if(orderDetails.length === 0) return null;
    let maxDate = new Date(orderDetails[0].expiredReceivedDate)
    for (let i = 1;i<orderDetails.length ;i++){
        const currentDate = new Date(orderDetails[i].expiredReceivedDate);
        if(currentDate > maxDate){
            maxDate = currentDate;
        }
    }
    return maxDate
}

export default getExpiredDateMax