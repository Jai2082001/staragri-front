import classes from './Profile.module.css'
import Navbar from '../Navbar/Navbar'
import {Container, Row, Col} from 'react-bootstrap'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import AddressContainer from './AddressContainer/AddressContainer'
import { Redirect } from 'react-router-dom'
import DeliveryForm from '../Checkout/Delivery/DeliveryForm/DeliveryForm'
import {Button} from 'react-bootstrap'
import PersonalDetails from './PersonalDetails/PersonalDetails'
import MyOrder from './MyOrder/MyOrder'

const Profile = () => {

    
    const [menu, changeMenu] = useState('edit');
    const [addressForm, changeAddressForm] = useState(false)

    const changeHandler = (event) => {
        changeMenu(event.target.id)
    }

    const state  = useSelector((state)=>{
        return state.profile.user
    })


    const addressHandler = () => {
        changeAddressForm((prevState)=>{
            return !prevState
        })
    }

    const logoutHandler  = () => {
        console.log('adad')
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.reload(false)
    }
    const noHandler = () => {

    }


    if(state.status === 'not logged in'){
        return (
            <Redirect to="/home"></Redirect>
        )
    }else{
        return (

            <>
            <div>
                <Navbar></Navbar>
                <Container className={'mt-5'}>
                    <Row>
                        <Col lg={'4'}>
                            <div className={classes.sidebar}>
                                {menu === 'edit' && <div className={classes.active} onClick={changeHandler} id={'edit'}>Edit Personal Details</div>}
                                {menu !== 'edit' && <div onClick={changeHandler} id={'edit'}>Edit Personal Details</div>}
                                
                                {menu === 'manage' && <div className={classes.active} onClick={changeHandler} id={'manage'}>Manage Address Book</div>}
                                {menu !== 'manage' && <div onClick={changeHandler} id={'manage'}>Manage Address Book</div>}
                                
                                {menu === 'order' && <div className={classes.active} onClick={changeHandler} id={'order'}>Order History</div>}
                                {menu !== 'order' && <div onClick={changeHandler} id={'order'}>Order History</div>}
                                
    
                                {menu === 'password' && <div className={classes.active} onClick={changeHandler} id={'password'}>Log Out</div>}
                                {menu !== 'password' && <div onClick={changeHandler} id={'password'}>Log Out</div>}
                            </div>
                        </Col>
                        <Col lg={'8'}>
                            <div className={classes.mainDiv}>
                                {menu === 'edit' && 
                                    <div className={classes.editDiv}>
                                        <PersonalDetails></PersonalDetails>      
                                    </div>
                                }
                                {menu === 'manage' && 
                                    <div className={classes.manageDiv}>
                                        
                                        {state.address && state.address.length > 0 && 
                                        <>
                                            {state.address.map((singleItem)=>{
                                            return (
                                                <AddressContainer single={singleItem} ></AddressContainer>   
                                            )
                                        })}
                                        </>}

                                        <Button variant="success" onClick={addressHandler}>{addressForm && 'Hide Address Form'} {!addressForm && 'Add Address'}</Button>
                                        
                                        {addressForm && 
                                            <DeliveryForm>
                                            </DeliveryForm>}

                                    </div>
                                }
                                {menu === 'order' && 
                                    <div className={classes.orderDiv}>
                                        <MyOrder></MyOrder>                          
                                    </div>
                                }
                                {menu === 'password' && 
                                    <div className={classes.passwordDiv}>
                                        <h3>Are You Sure?</h3>
                                        <Button onClick={logoutHandler} variant="success">Yes</Button>
                                        <Button onClick={()=>{changeMenu('edit')}} className={'ms-2'} variant='success'>No</Button>
                                    </div>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            </>
        )
    }

    
}

export default Profile