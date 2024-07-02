
import './ChartBox.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ChartBox = ({ icon, title, dataKey, chartData }) => {
    return (
        <div className='chartBox'>
            <div className='boxInfo'>
                <div className='title'>
                    <img 
                        src={icon}
                        height='20px'
                        width='20px'
                        alt="people" 
                    />
                    <span>{title}</span>
                </div>
                <h1>LASTETS 6 MONTH</h1> 
            </div>
            <div className='chartInfo'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};