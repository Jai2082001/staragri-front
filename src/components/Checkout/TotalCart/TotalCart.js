import classes from './TotalCart.module.css'
import { useEffect, useState } from 'react'
import {Spinner} from 'react-bootstrap'

const TotalCart = ({cart, setTotalAmount}) => {
    
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        setLoading(true);
        let done = 0
        for(let i=0;i<cart.length;i++){
            (function(i){
                console.log(cart.length);
                console.log(done)                
                fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWithId `, {
                    headers: {
                        productid: cart[i].product
                    }
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    const sample = parseInt(response.product.price) * parseInt(cart[i].quantity);
                    console.log(sample);
                    done = done + 1;         
                    setTotal((prevState)=>{
                        return prevState + sample
                    })
                    setTotalAmount((prevState)=>{
                        return prevState + sample
                    })
                    if(done === cart.length){
                        console.log("State Change")
                        setLoading(false);
                        return
                    }
                })
            })(i)
        }

    }, [])

    return (
        <div className={classes.parentDiv}>
            {loading && <Spinner animation='border'></Spinner>}
            {!loading && <p>Total:-{total}</p>}
        </div>
    )
}

export default TotalCart