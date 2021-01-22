// import Head from 'next/head'
import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import timestampToDate from 'timestamp-to-date';
import {Bar, Pie} from 'react-chartjs-2';

export default function Home() {
  const [data, setData] = useState('');
  const [chartData, setChartData] = useState({});
  const [PiechartData, setPieChartData] = useState({});
  const getData=async()=>{
    await axios.get('https://corona.lmao.ninja/v2/continents?yesterday=true&sort').then(r=>{
      let labels = [];
      let data = [];
      let data2 = [];
      r.data.map((e)=>{
        labels.push(e.continent);
        data.push(e.cases);
        data2.push(e.active);
      });
      setData(r);
      setChartData({
        labels,
        datasets: [
          {
          label: 'Covid cases By continent',
          backgroundColor: 'rgb(255, 153, 0)',
          borderColor: 'rgb(0, 153, 51)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(51, 153, 255)',
          hoverBorderColor: 'rgb(255, 51, 0)',
          data,
          }
        ]
      });
      setPieChartData({
        labels,
        datasets: [{
          data,
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF68284',
          '#36A2EB',
          '#FFBB56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF68284',
          '#36A2EB',
          '#FFBB56'
          ]
        }]}
      );
    });
  }
  
  return (
    <div className={styles.container}>
      <h1>Welcome!!! A simple graph in NextJS</h1>
      <h3 style={{cursor: 'pointer'}} onClick={()=>{getData()}}>
        {data?'Covid reports "CONTINENT" wise':'Click here'}</h3>
      {
        data?(
          <div>
            <table className='table'>
              <tr>
                <th> LastUpdated </th>
                <th> Continent </th>
                <th> Total Cases </th>
                <th> Active cases </th>
                <th> Recovered </th>
                <th> Deaths </th>
              </tr>
              {data.data.map((e) =>{
                return(
                  <tr key={e.continent}>
                    <td> {timestampToDate(e.updated,'yyyy-MM-dd HH:mm:ss')} </td>
                    <td> {e.continent} </td>
                    <td> {e.cases} </td>
                    <td> {e.active} </td>
                    <td> {e.recovered} </td>
                    <td> {e.deaths} </td>
                  </tr>
                )})}
            </table>
            <div className='graph'>
              <h2>Chart for Total cases</h2>
              <Bar data={chartData} />
            </div>
            <div className='graph'>
              <h2>Chart for Active cases</h2>
              <Pie
                data={PiechartData}
              />
            </div>
          </div>
        ):<h4>Graphical representaion will apprear here</h4>
      }
    </div>
  )
}
