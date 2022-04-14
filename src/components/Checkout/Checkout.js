import classes from './Checkout.module.css'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ProfileVerification from './ProfileVerification/ProfileVerification'
import Payment from './Payment/Payment'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Delivery from './Delivery/Delivery'
import Cart from './Cart/Cart'
import doneImg from '../../images/doneIcon.png'


const Checkout = () => {

    const profileState = useSelector((state)=>{
        return state.profile.user
    })

    const [state, changeState] = useState(false);

    const [delivery, changeDelivery] = useState(false);

    const [totalAmount, setTotalAmount] = useState(0)

    console.log(profileState)

    const changeAddress = () => {
        changeDelivery(false)
    } 
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    
    const __DEV__ = document.domain === 'localhost'

    async function displayRazorpay() {
        console.log("In Display Razorpay")
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

        console.log(res)
        console.log(totalAmount)
		// const data = await fetch(`${process.env.REACT_APP_FETCH_LINK}/orderIssue`, { method: 'POST', body: {userid: profileState._id, address: delivery, amount: totalAmount} }).then((t) =>
        //     t.json()
		// )
        console.log(profileState);
        console.log(process.env.REACT_APP_FETCH_LINK);
        let data;
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderIssue`, {
            method: 'POST',
            headers: {
                userid: profileState._id,
                address: delivery,
                amount: totalAmount
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            console.log(data)
            data = response
            const options = {
                key: __DEV__ ? 'rzp_test_bXa8SSuh79SRqn' : 'PRODUCTION_KEY',
                currency: data.currency,
                amount: data.amount.toString(),
                order_id: data.id,
                name: 'Donation',
                description: 'Thank you Shopping With Us',
                image: 'http://localhost:1337/logo.svg',
                handler: function (response) {
                    alert(response.razorpay_payment_id)
                    alert(response.razorpay_order_id)
                    alert(response.razorpay_signature)
                },
                prefill: {
                    
                    email: 'sdfdsjfh2@ndsfdf.com',
                    phone_number: '9899999999'
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        })
    }


    return (
        <>
        <Navbar></Navbar>
        <div className={classes.parentDiv}>
            <Container>

                <Row>
                    <Col lg={'8'} className={classes.colDiv}>

                        {!delivery && 
                        <>
                            <>
                            {profileState.status === 'not logged in' && 
                                <>
                                <ProfileVerification done={false}></ProfileVerification>
                                <div className={classes.parentChildDiv}>
                                {'Delivery Address'}
                                </div>
                                <div className={classes.parentChildDiv}>
                                {'Final Order'}
                                </div>
                                </>
                                }
                            {profileState.status !== 'not logged in' && 
                            <>
                                <ProfileVerification done={true}></ProfileVerification>
                                <Delivery changeDelivery={changeDelivery} delivery={delivery} done={false}></Delivery>
                            </>
                            }
                            </>
                        </>}

                        {delivery && profileState.status !== 'not logged in' &&
                        
                        <>
                            <ProfileVerification done={true}></ProfileVerification>
                            <div className={classes.deliverDoneDiv}>
                                <img src={doneImg}></img>
                                <div>
                                <div className={classes.deliverChildDiv}>
                                    <p>Deliver Verification</p>
                                    <p>{delivery}</p>
                                </div>
                                <Button onClick={changeAddress} variant="success">Change Address</Button>
                                </div>
                            </div>
                            <a
                                className="App-link"
                                onClick={displayRazorpay}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Pay {totalAmount}
                            </a>
                            <a></a>
                        </>}
                    </Col>
                    <Col lg={'4'}>
                       <Cart totalAmount={totalAmount} setTotalAmount={setTotalAmount}></Cart> 
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )

}

export default Checkout