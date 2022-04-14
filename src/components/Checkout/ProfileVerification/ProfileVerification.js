import classes from './ProfileVerification.module.css'
import { useState, useRef, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie'
import { userActions } from '../../../Store/profile-slice'
import doneIcon from '../../../images/doneIcon.png'
import { cartActions } from '../../../Store/cart-slice';

const ProfileVerification = ({ done }) => {

    const dispatch = useDispatch()
    const [activity, changeActivity] = useState('login')
    const [errorRegister, changeErrorRegister] = useState(false);
    const [errorLogin, changeErrorLogin] = useState(false);
    const nameRegister = useRef();
    const emailRegister = useRef();
    const passwordRegister = useRef();
    const numberRegister = useRef();
    const emailLogin = useRef();
    const passwordLogin = useRef();
    const [cookies, setCookie] = useCookies(['jwt'])

    const userState = useSelector((state) => {
        return state.profile.user
    })

    const cartState = useSelector((state) => {
        return state.cart.carts
    })


    // useEffect(()=>{
    //     fetch(`${process.env.REACT_APP_FETCH_LINK}/`)
    // }, [])


    const validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    const registerHandler = (e) => {
        e.preventDefault();

        if (nameRegister.current.value) {
            if (nameRegister.current.value.length < 2) {
                changeErrorRegister("Enter your full Name")
            } else {
                if (emailRegister.current.value) {
                    if (!(validateEmail(emailRegister.current.value))) {
                        changeErrorRegister("Enter A Valid Email")
                    } else {
                        if (numberRegister.current.value) {
                            if (numberRegister.current.value.length !== 10) {
                                changeErrorRegister("Enter a Valid Phone Number Without STD code")
                            } else {
                                if (passwordRegister.current.value) {
                                    if (passwordRegister.current.value.length < 3) {
                                        changeErrorRegister("Enter a valid password of atleast 3 characters long")
                                    } else {
                                        fetch(`${process.env.REACT_APP_FETCH_LINK}/registerUserSignUp`, {
                                            headers: {
                                                name: nameRegister.current.value,
                                                email: emailRegister.current.value,
                                                password: passwordRegister.current.value,
                                                number: numberRegister.current.value
                                            }
                                        }).then((response) => {
                                            return response.json()
                                        }).then((response) => {
                                            if (response.status === "insertedUser") {
                                                changeActivity('login')
                                            } else {
                                                changeErrorRegister(response.status);
                                            }
                                        })
                                    }
                                } else {
                                    changeErrorRegister("Enter a Password")
                                }
                            }
                        } else {
                            changeErrorRegister("Enter a Phone Number")
                        }
                    }
                } else {
                    changeErrorRegister("Enter your Email")
                }
            }
        } else {
            changeErrorRegister('Enter Your Name')
        }

    }


    const loginHandler = (e) => {
        e.preventDefault();

        if (emailLogin.current.value) {
            if (passwordLogin.current.value) {
                const isAlphaFunc = (char) => {
                    return (/[a-zA-Z]/).test(char)
                }
                const bool = isAlphaFunc(emailLogin.current.value[0]);
                if (bool) {
                    const anotherbool = validateEmail(emailLogin.current.value);
                    if (anotherbool) {
                        fetch(`${process.env.REACT_APP_FETCH_LINK}/loginUser`, {
                            headers: {
                                email: emailLogin.current.value,
                                password: passwordLogin.current.value,
                                src: 'email'
                            },
                        }).then((response) => {
                            return response.json()
                        }).then((response) => {
                            if (response.message === 'no authentication') {
                                changeErrorLogin("Email and Password do not match")
                            }
                            else {
                                setCookie('jwt', response._id, { path: '/' })
                                dispatch(userActions.changeUser(response))

                                fetch(`${process.env.REACT_APP_FETCH_LINK}/cartAssociationTemp`, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ carts: cartState, userid: response._id })
                                }).then((response) => {
                                    return response.json()
                                }).then((response) => {
                                    window.location.reload()
                                })
                            }

                        })
                    } else {
                        changeErrorLogin("Enter a valid Email or Phone Number")
                    }

                } else {
                    if (emailLogin.current.value.length !== 10) {
                        changeErrorLogin("Enter a Valid Phone Number or Email")
                    } else {
                        fetch(`${process.env.REACT_APP_FETCH_LINK}/loginUser`, {
                            headers: {
                                email: emailLogin.current.value,
                                password: passwordLogin.current.value,
                                src: 'phone'
                            },
                        }).then((response) => {
                            return response.json()
                        }).then((response) => {
                            if (response.message === 'no authentication') {
                                changeErrorLogin("Phone Number and Password do not match")
                            }
                            else {
                                setCookie('jwt', response._id, { path: '/' })
                                dispatch(userActions.changeUser(response))
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/cartAssociationTemp`, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ carts: cartState, userid: userState._id })
                                }).then((response) => {
                                    return response.json()
                                }).then((response) => {

                                    fetch(`${process.env.REACT_APP_FETCH_LINK}/userAuthenticated`, {
                                        headers: {
                                          jwt: cookies.jwt
                                        }
                                      }).then((response) => {
                                        return response.json();
                                      }).then((response) => {
                                        dispatch(userActions.changeUser(response))
                                      })
                                })
                            }
                        })
                    }
                }
            } else {
                changeErrorLogin("Enter a Valid Password")
            }

        } else {
            changeErrorLogin("Enter A Valid Email or Phone Number")
        }


    }


    const loggedIn = () => {
        changeErrorLogin(false)
        changeActivity('login')
    }

    const notRegister = () => {
        changeErrorRegister(false)
        changeActivity('signup')
    }



    if (!done) {

    }
    return (
        <>
            {done &&
                <div className={classes.parentDiv}>
                    <div className={classes.doneDiv}>
                        <div className={classes.numberVer}>
                            <img src={doneIcon}></img>
                            <p>Profile Verification</p>
                        </div>
                    </div>
                </div>
            }
            {!done && <>
                <div className={classes.parentDiv}>
                    {activity === 'login' &&
                        <div className={classes.loginDiv}>
                            <h3 className={"mb-3"}>Profile Verification</h3>
                            {errorLogin && <Alert variant="danger">{errorLogin}</Alert>}
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address/Phone Number</Form.Label>
                                    <Form.Control ref={emailLogin} style={{ boxShadow: "0 0 0 0.25rem rgb(91 215 91 / 25%)" }} type="text" placeholder="Enter Email/Enter Phone Number" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={passwordLogin} style={{ boxShadow: "0 0 0 0.25rem rgb(91 215 91 / 25%)" }} type="password" placeholder="Enter Password" />
                                </Form.Group>
                            </Form>
                            <button onClick={loginHandler}>Login</button>
                            <button className={"ms-2"} onClick={notRegister}>Not Registered?</button>
                        </div>
                    }
                    {activity === 'signup' &&
                        <div className={classes.loginDiv}>
                            <h3 className='mb-3'>Profile Verification</h3>
                            {errorRegister && <Alert variant='danger'>{errorRegister}</Alert>}
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control ref={nameRegister} style={{ boxShadow: "0 0 0 0.25rem rgb(91 215 91 / 25%)" }} type="text" placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control ref={emailRegister} style={{ boxShadow: "0 0 0 0.25rem rgb(91 215 91 / 25%)" }} type="email" placeholder="Enter Email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control ref={numberRegister} style={{ boxShadow: "0 0 0 0.25rem rgb(91 215 91 / 25%)" }} type="number" placeholder="Enter Phone Number" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={passwordRegister} style={{ boxShadow: "0 0 0 0.25rem rgb(91 215 91 / 25%)" }} type="password" placeholder="Enter Password" />
                                </Form.Group>
                            </Form>
                            <button onClick={registerHandler}>SignUp</button>
                            <button className={"ms-2"} onClick={loggedIn}>Already Logged In?</button>
                        </div>
                    }
                </div>

            </>}
        </>
    )
}

export default ProfileVerification