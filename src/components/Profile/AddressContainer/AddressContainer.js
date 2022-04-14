import classes from './AddressContainer.module.css'
import { useEffect, useState } from 'react'
import {Spinner} from 'react-bootstrap';

const AddressContainer = ({single}) => {
    
    const [address, changeAddress] = useState('');
    const [loading, changeLoading] = useState(false);

    useEffect(()=>{
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addressDisplay`, {
            headers: {
                address: single
            }
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            if(response._id){
                const {fullname, address, city, pincode, state} = response
                const string = `${fullname} ${address} ${city} ${state} ${pincode}`
                changeAddress(string)
                changeLoading(false)
            }else{
                changeAddress(false)
                changeLoading(false)
            }
        })
    }, [])
    
    return (
        <div className={classes.addressDiv}>
            {loading && <Spinner animation='border'></Spinner>}
            {!loading && `${address}`}
        </div>
    )
}

export default AddressContainer
