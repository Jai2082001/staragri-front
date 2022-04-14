import classes from './AddressDisplay.module.css'
import {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'

const AddressDisplay = ({product, delivery, changeDelivery}) => {
    
    const [address, changeAddress] = useState(false);
    const [loading, changeLoading] = useState(false);

    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addressDisplay`, {
            headers: {
                address: product 
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if(response._id){
                const {fullname, address, city, pincode, state} = response
                const string = `${fullname} ${address} ${city} ${state} ${pincode}`
                
                changeAddress(string)
            }else{
                changeAddress(false)
            }
               
        })
    }, [])

    const deliveryHandler = () => {
        changeDelivery(address)
    }

    return (
        <div className={classes.parentDiv}>
            <div className={classes.displayFlex}>
                <p>{address}</p>
                <Button onClick={deliveryHandler} variant="success">{'Deliver Here'}</Button>
            </div>
        </div>
    )
}

export default AddressDisplay