import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AccountPieChart = ({accountBalance,depositAccount}) => {
  // value Account Balance and Deposit Account
  const dataValues = [accountBalance, depositAccount]; // custom value
  const labels = ['Account Balance', 'Deposit Account'];

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['#141ED1', '#9BE6C8'], // color
        hoverBackgroundColor: ['#141ED1', '#9BE6C8'], // color when hover
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
        labels: labels,
        tooltip: {
            callbacks: {
              // Hiển thị tooltip với định dạng tiền tệ
              label: (tooltipItem) => {
                const value = tooltipItem.raw.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });
                return `${tooltipItem.label}: ${value}`;
              },
            },
        }
    },
  };

  return (
    <div className="expected-interest">
      <Pie data={data} options={options} />
    </div>
  );
};

export default AccountPieChart;
