import { useEffect, useState } from 'react'
import classes from './MyOrder.module.css'
import { useSelector } from 'react-redux'
import Single from './Single/Single'


const MyOrder = () => {

    const profileState = useSelector((state) => {
        return state.profile.user
    })

    const [orders, changeOrders] = useState([])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderUser`, {
            headers: {
                id: profileState._id
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response)
            changeOrders(response);
        })
    }, [])

    return (
        <div>
            {orders.map((singleItem) => {
                return (
                    <>
                            <>
                                <div className={classes.parentDiv}>
                                    {singleItem.cart.map((single) => {
                                        return (
                                            <Single single={single}></Single>
                                        )
                                    })}
                                    <hr></hr>
                                    <p style={{textAlign: 'center'}}>Total Amount:- {singleItem.amount}</p>
                                    <hr></hr>
                                    {singleItem.status === 'reject' && <p style={{textAlign: 'center', color: 'red'}}>Sorry Product Not Available</p>}
                                    {singleItem.status === 'Accepted' && singleItem.transit !== 'delivered' && <p style={{textAlign: 'center', color: 'green'}}>In-Transit</p>}
                                    {singleItem.status === 'Accepted' && singleItem.transit === 'delivered' && <p style={{textAlign: 'center', color: 'green'}}>Delivered</p>}
                                    
                                </div>
                            </>
                    </>
                )
            })}
        </div>
    )
}

export default MyOrder