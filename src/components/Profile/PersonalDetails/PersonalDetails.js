import classes from './PersonalDetails.module.css'
import { useState, useEffect } from 'react'
import {Button, Spinner, Form} from 'react-bootstrap'
import {useSelector} from 'react-redux'

const PersonalDetails = () => {


    const userState = useSelector((state)=>{
        return state.profile.user
    })


    const [fullName, changeFullName] = useState(userState.name);
    const [email, changeEmail] = useState(userState.email);
    const [number, changeNumber ] = useState(userState.number);
    const [loading, changeLoading] = useState(false)



    const handleChange = (event) => {
        if(event.target.id === 'name'){
            changeFullName(event.target.value)
        }else if(event.target.id === 'mail'){
            changeEmail(event.target.value)
        }else{
            changeNumber(event.target.value)
        }
    }

    const updateInfo = () => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/updateUser`, {
            headers: {
                id: userState._id,
                name: fullName,
                email: email,
                number: number
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            changeLoading(false)
            window.location.reload()
        })
    } 

    return (
        <div className={classes.parentEditContainer}>
            <h2>Personal Information</h2>
            <div className={classes.parentSubContainer}>
                <label>Full Name:-</label>
                <div className={classes.parentSub}>
                    <div className={classes.subDiv}><Form.Control onChange={handleChange} value={fullName} id='name'></Form.Control></div> </div>
            </div>
            <div className={classes.parentSubContainer}>
                <label>Change Email:-</label>
                <div className={classes.parentSub}>
                    <div className={classes.subDiv}><Form.Control onChange={handleChange} value={email} id='mail' ></Form.Control></div>                                        </div>
            </div>
            <div className={classes.parentSubContainer}>
                <label>Change Number:-</label>
                <div className={classes.parentSub}>
                    <div className={classes.subDiv}><Form.Control onChange={handleChange} value={number} id='num' ></Form.Control></div>                                        </div>
            </div>
            <div className={classes.btnContainer}>
                <Button className={'mt-3'} variant="success" onClick={updateInfo}>{!loading && 'Save Changes'}{loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}</Button>
            </div>
        </div>
    )
}

export default PersonalDetails