function getColorTime(orderDate, receivedDate) {
    const now = new Date();
    const orderDateTime = new Date(orderDate);   
    const receivedDateTime = new Date(receivedDate);
  
    const totalTime = receivedDateTime - orderDateTime;
    const takenTime = now.getTime() - orderDateTime.getTime();
    if (receivedDateTime < now) {
        return '#FF7A7A'; // Red 
    } else if (takenTime <= totalTime / 2) {
        return '#ACE6AE'; // Green 
    } else {
        return '#FFE77A'; // yellow
    }
}
export default getColorTime;
