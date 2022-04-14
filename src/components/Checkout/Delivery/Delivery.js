import classes from './Delivery.module.css'
import { useSelector, useDispatch } from 'react-redux'
import DeliveryForm from './DeliveryForm/DeliveryForm'
import { useState } from 'react'
import AddressDisplay from './AddressDisplay/AddressDisplay'
import {Button} from 'react-bootstrap'


const Delivery = ({delivery, changeDelivery}) => {


    const state = useSelector((state)=>{
        return state.profile.user
    })

    const [formHandler, changeFormHandler] = useState(false)

    const [reload, changeReload] = useState(0);

    const addressHandler = () => {
        changeFormHandler((prevState)=>{
            return !prevState
        })
    }

    if(state){
        if(state.status !== 'not logged in' ){
            return (
                <div className={classes.parentDiv}>
                   <p>Delivery Address</p>
                  {!delivery && 
                    <>
                        {!state.address && <DeliveryForm changeReload={changeReload}></DeliveryForm>} 
                    
                    {state.address  && 
                    <>
                        {
                        state.address && state.address.length === 0 && <DeliveryForm changeReload={changeReload}></DeliveryForm>}
                        {state.address.map((singleItem)=>{
                            return (
                                <AddressDisplay changeDelivery={changeDelivery} delivery={delivery} product={singleItem}></AddressDisplay>
                            )
                        })
                    }
                    </>}
                    
                    
                    <Button onClick={addressHandler}  className={'mt-3'} variant="success">{!formHandler && 'Add Address'}{formHandler && 'Hide Address'}</Button>

                    {formHandler && <DeliveryForm></DeliveryForm>}
            
                        </>
                    } 
                </div>
            )
        }else{
            return (
                <>
                </>
            )
        }
    }else{
        return (
            <>
            </>
        )
    }


    // if(state.status !== 'not logged in'){
    //     return (
    //         <div className={classes.parentDiv}>
                
    //         </div>
    //     )
    // }else{
    //     return (
    //         <>
    //         </>
    //     )
    // }

}

export default Delivery