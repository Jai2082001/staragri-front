import classes from './SingleItem.module.css'
import { useEffect, useState } from 'react';
import {Spinner} from 'react-bootstrap'

const SingleItem = ({ single, userid }) => {

    const [singleItem, changeSingleItem] = useState(false);
    const [loading, changeLoading] = useState(false)
    const [fullScreen, setFullScreen] = useState(false);


    useEffect(() => {
        console.log("Hello")
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWithId `, {
            headers: {
                productid: single.product
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response)
            changeSingleItem(response.product)
            changeLoading(false)
        })
    }, [])

    const iconHandler = () => {
        setFullScreen(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/cartItemDelete`, {
            headers: {
                userid: userid,
                productid: single.product
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            setFullScreen(false)
            window.location.reload()
        })
    }


    return (
        <>
        <div className={classes.cartChildDiv}>
            <div className={classes.iconDiv}>
                <i onClick={iconHandler} class="fa fa-trash-o"></i>
            </div>
            {!loading && 
            <>
            <div className={classes.imgDiv}>
                <img src={singleItem.displayimages}></img>
            </div>
            <div className={classes.contentDiv}>
                <p>{singleItem.name}</p>
                <p>Price:-{singleItem.price}</p>
                <p>Qty:-{single.quantity}</p>
            </div>
            </>}
            {loading && <Spinner animation='border'></Spinner>}
        </div>
        <hr style={{width: "100%"}}></hr>
        </> 
    )
}

export default SingleItem