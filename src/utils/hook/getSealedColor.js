import dayjs from "dayjs";

function getExpiredDateMax(orders) {
    if (orders.length === 0) return null;
    let maxDate = new Date(orders[0].orderDate);
    for (let i = 1; i < orders.length; i++) {
      const currentDate = new Date(orders[i].orderDate);
      if (currentDate > maxDate) {
        maxDate = currentDate;
      }
    }
    return maxDate;
}
function getSealedColor(orders) {
    const now = dayjs();
    const expiredDate = dayjs(getExpiredDateMax(orders));

    if (expiredDate.isBefore(now, 'day')) {
        return '#de62f4';
    } else {
        return '';
    }
}

export default getSealedColor;
