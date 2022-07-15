import axios from 'axios';
import icon from '../../assets/img/notification-icon.svg';
import { BASE_URL } from '../../utils/request';
import './styles.css';
import {toast} from 'react-toastify'

type Props ={
    saleId: number
}

export default function NotificationButton({ saleId }: Props ){

    function handleClick(saleId: number){
        axios(`${BASE_URL}/sales/${saleId}/notification`)
        .then(response => {
            toast.success("SMS envida com sucesso.",{
                theme: 'dark'
            });
        });
    }

    return(
        <div className='dsmeta-red-btn' onClick={()=> handleClick(saleId)}>
            <img src={icon} alt="Notification Button" />
        </div>
    );
}