import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import AxiosRequest from '../utils/AxiosRequest';
// export const data = [
//   ["Year", "Totals", ],
//   ["2014", 1000],
//   ["2015", 1170],
//   ["2016", 660],
//   ["2017", 1030],
//   ["2018", 1000],
//   ["2019", 1170],
//   ["2020", 660],
//   ["2021", 1030],
// ];

export const options = {
    chart: {
        title: 'Totals year',
    },
};

export default function BarChart() {
    const [chart, setChart] = useState([]);
    const dt = [['Year', 'Totals']];
    useEffect(() => {
        charts();
    }, []);
    const charts = () => {
        AxiosRequest.get('oder/chart').then((res) => {
            setChart(res.data);
        });
    };

    chart.forEach((data) => {
        dt.push([`${data.year}`, data.total]);
    });
    console.log(dt);
    return <Chart chartType="Bar" width="100%" height="400px" data={dt} options={options} />;
}
