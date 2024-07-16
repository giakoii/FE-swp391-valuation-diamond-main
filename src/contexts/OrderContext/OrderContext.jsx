import React, { createContext, useContext } from 'react'
import useAuth from '../../utils/hook/useAuth'
import { useRouteLoaderData } from 'react-router-dom';
import orderList from '../../utils/hook/getOrderList';
import { API_BASE_URL } from '../../utils/constants/url';

const OrderContext = createContext();

export const OrderProvider = ({children}) => {
    const {user} = useAuth();
    const {myOrder, loading} = orderList(`${API_BASE_URL}/order_request/getOrderByUserId/${user.userId}`)

  return (
    <OrderContext.Provider value={{myOrder, loading}}>
        {children}
    </OrderContext.Provider>
  )
}

export const useOrderContext = ()=> useContext(OrderContext)