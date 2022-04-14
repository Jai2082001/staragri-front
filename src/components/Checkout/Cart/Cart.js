import classes from './Cart.module.css'
import {useSelector } from 'react-redux'; 
import SingleItem from './SingleItem/SingleItem';
import TotalItem from '../TotalCart/TotalCart'

const Cart = ({totalAmount, setTotalAmount}) => {

    let total = 0;

    const cartState = useSelector((state)=>{
        return state.cart.carts
    })

    console.log(cartState)

    const profileState = useSelector((state)=>{
        return state.profile.user
    })

    
    if(profileState.status === 'not logged in'){
        let sample = 0;

        if(cartState){
            cartState.map((singleItem)=>{
                let number1 = parseInt(singleItem.product.price) * parseInt(singleItem.quantity);
                sample = sample + number1;
            })
            total = sample
            setTotalAmount(sample)
        }
   
    }


    return (
        <div className={classes.cartDiv}>
            <p>{"Order Summary"}</p>
            {
            profileState.status === 'not logged in' && 
            <>
                <div className={classes.notLogged}>
                    {cartState && 
                    <>
                        {cartState.map((singleItem)=>{
                        return (
                            <div className={classes.cartChildDiv}>
                                <div className={classes.imgDiv}>
                                    <img src={singleItem.product.displayimages}></img>
                                </div>
                                <div className={classes.contentDiv}>
                                    <p>{singleItem.product.name}</p>
                                    <p>Price:-{singleItem.product.price}</p>
                                    <p>Qty:-{singleItem.quantity}</p>
                                </div>
                            </div>
                        )
                        })}
                    </>}
                </div>
                <hr style={{color: 'black', width: '100%'}}></hr>
                <div className={classes.notLogged}>
                    
                    {cartState && 
                    <>
                        <div className={classes.cartChildDiv}>
                            <p>Total Amount</p>
                            <p>{total}</p>
                        </div>
                    </>}
                </div>
            </>
            }
            {
                profileState.status !== 'not logged in' && 
                <>
                    {profileState.cart && 
                    <>
                      
                      
                        {profileState.cart.length > 0 && 
                        <>
                            {profileState.cart.map((singleItem)=>{
                            return (
                                <SingleItem userid={profileState._id} single={singleItem}></SingleItem>
                            )
                            })}
                            <hr style={{color: 'black', width: '100%'}}></hr>
                            <div className={classes.notLogged}>            
                                <TotalItem setTotalAmount={setTotalAmount} cart={profileState.cart}></TotalItem>
                            </div>
                        </>
                        }

                        {profileState.cart.length === 0 && 
                        <>
                            <p>No Items added in the Cart</p>
                        </>}
                        
                        
                    </>}
                    
                </>
            }
        </div>
    )
}

export default Cart