import axios from "axios";
import { useState, useEffect } from "react";
import {BASE_URL} from '../../utils/request'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import NotificationButton from "../NotificationButton";
import './styles.css';
import { Sale } from "../../models/sale";

export default function SalesCard(){

    const min = new Date(new Date().setDate(new Date().getDate() - 365));
    const max = new Date();

    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    const [sale, setSale] = useState<Sale[]>([]);


    useEffect(()=>{
      axios.get(`${BASE_URL}/sales`)
      .then(response => {
        setSale(response.data.content)
        console.log(response.data)
      });
    },[]);

    return(
      <>
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
              <div className="dsmeta-form-control-container">
              <DatePicker
                    selected={minDate}
                    onChange={(date: Date) => setMinDate(date)}
                    className="dsmeta-form-control"
                    dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="dsmeta-form-control-container">
              <DatePicker
                    selected={maxDate}
                    onChange={(date: Date) => setMaxDate(date)}
                    className="dsmeta-form-control"
                    dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            <div>
              <table className="dsmeta-sales-table">
                <thead>
                  <tr>
                    <th className="show992">ID</th>
                    <th className="show576">Data</th>
                    <th>Vendedor</th>
                    <th className="show992">Visitas</th>
                    <th className="show992">Vendas</th>
                    <th>Total</th>
                    <th>Notificar</th>
                  </tr>
                </thead>
                <tbody>
                  {sale.map(sale =>{
                    return(
                      <tr key={sale.id}>
                        <td className="show992">{sale.id}</td>
                        <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                        <td>{sale.sallerName}</td>
                        <td className="show992">{sale.visited}</td>
                        <td className="show992">{sale.deals}</td>
                        <td>{sale.amount.toFixed(2)}</td>
                        <td>
                      <div className="dsmeta-red-btn-container">                        
                        <NotificationButton/>                        
                      </div>
                    </td>
                  </tr>
                    )
                  })}                  
                  
                </tbody>

              </table>
            </div>

          </div>
      </>  
    );
}