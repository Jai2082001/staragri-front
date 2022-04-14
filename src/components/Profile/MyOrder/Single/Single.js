import classes from './Single.module.css'
import {useState, useEffect} from 'react'

const Single = ({single}) => {

    const [product, setProduct] = useState(false)
    console.log(single)

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWithId`, {
            headers: {
                productid: single.product
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            setProduct(response.product)
        })
    }, [])

    return (
        <div className={classes.orderDiv}>
            <div className={classes.childDiv}>
                <img src={product.displayimages}></img>
                <div className={classes.contentDiv}>
                <p>Name:- {product.name}</p>
                <p>Price:- {product.price}</p>
                <p>Quantity:- {single.quantity}</p>
                </div>
            </div>
        </div>
    )
}

export default Single