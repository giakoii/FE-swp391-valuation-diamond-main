import React, { useEffect, useState } from 'react';
import './dashBoard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartBox } from '../../../component/componentAdmin/ChartBox/ChartBox.jsx'


export const DashBoard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://667c01d13c30891b865ae980.mockapi.io/test');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [totalOrderData, setTotalOrderData] = useState([]);
  const [totalQuantityData, setTotalQuantityData] = useState([]);

  useEffect(() => {
      const fetchTotalOrderData = async () => {
          try {
              const response = await fetch('https://667c01d13c30891b865ae980.mockapi.io/test');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              setTotalOrderData(jsonData);
          } catch (error) {
              console.error('Error fetching total order data:', error);
          }
      };

      const fetchAnotherData = async () => {
          try {
              const response = await fetch('https://667c01d13c30891b865ae980.mockapi.io/test');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              setTotalQuantityData(jsonData);
          } catch (error) {
              console.error('Error fetching another data:', error);
          }
      };

      fetchTotalOrderData();
      fetchAnotherData();
  }, []);
  return (
    <div className='home h-100'>
    <div className='box box1'>
        <ChartBox
            icon="/assets/assetsAdmin/kanban.svg"
            title="Total Order"
            dataKey="totalPrice"
            chartData={totalOrderData}
        />
    </div>
    <div className='box box3'>
        <ChartBox
            icon="/assets/assetsAdmin/kanban.svg"
            title="Total Quantity"
            dataKey="totalPrice"
            chartData={totalQuantityData}
        />
    </div>
      <div className="box box4">
        <div className='box-title my-4' style={{ color: "white" }}>
          <img
            src='/assets/assetsAdmin/dashboard.png'
            width='30'
            height='30'
            className='my-3 mx-3'
            style={{ filter: 'invert(100%)' }}
            alt='Logo'
          />
          LASTEST 6 MONTH REVENUE
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#ffffff" />
            <YAxis type="number" domain={[0, 'auto']} stroke="#ffffff" />
            <Tooltip
              contentStyle={{ backgroundColor: '#333', border: 'none' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Bar dataKey="totalPrice" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
