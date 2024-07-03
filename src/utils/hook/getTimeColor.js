function getColorTime(orderDate, receivedDate) {
    const now = new Date();
    const orderDateTime = new Date(orderDate);
    // UTC -7 + 7 = UTC
    orderDateTime.setHours(orderDateTime.getHours() - 7);
    const receivedDateTime = new Date(receivedDate);
    receivedDateTime.setHours(receivedDateTime.getHours() - 7);
    const totalTime = receivedDateTime - orderDateTime;
    const takenTime = now.getTime() - orderDateTime.getTime();
    if (receivedDateTime < now) {
        return '#FF7A7A'; // Red color if the received date is in the past
    } else if (takenTime <= totalTime / 2) {
        return '#ACE6AE'; // Green color in the first half of the total time
    } else {
        return '#FFE77A'; // Yellow color in the second half of the total time
    }
}
export default getColorTime;
