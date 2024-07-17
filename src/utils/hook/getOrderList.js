import { useEffect, useState } from "react"
import updateById from "../updateAPI/updateById";
import { API_BASE_URL } from "../constants/url";
import getExpiredDateMax from "./getExpiredDateMax";
import dayjs from "dayjs";
const orderList = (api) => {
  const [myOrder, setMyOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`);
    const data = await response.json();
    return data;
  }
  const updateOrderStatus = async (orders) => {
    const orderPromise = orders.map(async (order) => {
      const orderDetails = await fetchOrderDetails(order.orderId);
      const allFinished = orderDetails.every((detail) => detail.status === 'Finished');
      const expiredDateMax = getExpiredDateMax(orderDetails);
      const now = new Date();
  
      if (allFinished && (order.status !== 'Finished' && order.status !== 'Sealed')) {
        await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status', 'Completed');
        order.status = 'Completed';

      } else if (expiredDateMax && expiredDateMax < now && (order.status !== 'Sealed' && order.status === 'Completed')) {
        await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status', 'Sealed');
        order.status = 'Sealed';
      }
      return order;
    });
  
    return Promise.all(orderPromise);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        let data = await response.json();
        data = await updateOrderStatus(data);
        const sortedData = data.sort((a, b) => Date.parse(b.orderDate) - Date.parse(a.orderDate));
        setMyOrder(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);

  return { myOrder, loading };
}

export default orderList