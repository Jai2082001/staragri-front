import classes from './Navbar.module.css'
import logo from '../../images/logo.jpg'
import { Dropdown } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import dropdown from '../../images/dropdownWhite.png'
import { OverlayTrigger, Tooltip, Popover, Accordion } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Offcanvas } from 'react-bootstrap'
import Sticky from 'react-sticky-el'

const Navbar = () => {

    const [category, changeCategory] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const state = useSelector((state) => {
        return state.profile.user
    })


    const history = useHistory();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            changeCategory(response);
        })
    }, [])

    const loginHandler = () => {
        if (state.status === "not logged in") {
            history.push('/profileVerification')
        } else {
            history.push('/profile')
        }
    }

    const renderChildTooltip = (props) => {
        return (
            <Tooltip className={classes.navbarPop2} id="overlay-example" {...props}>
                <div className={classes.childNav2}>
                    {props.map((singleItem) => {
                        return (
                            <>
                                <p onClick={() => { level2Category(singleItem.parentName, singleItem.name) }}>{singleItem.name}</p>
                            </>
                        )
                    })}
                </div>
            </Tooltip>
        )
    }

    const level1Category = (name) => {
        history.push(`/categoryDisplay/${name}`)
        window.location.reload()
    }

    const level2Category = (parentName, name) => {
        history.push(`/categoryDisplay/${parentName}/${name}`)
        window.location.reload()
    }

    const renderTooltip = (props) => {
        return (
            <Tooltip className={classes.navbarPop} id="button-tooltip" {...props}>
                <div className={classes.childNav}>
                    {props.map((singleItem) => {
                        return (
                            <>
                                {!singleItem.category && <p onClick={() => { level1Category(singleItem.name) }}>{singleItem.name}</p>}
                                {singleItem.category &&
                                    <>

                                        <OverlayTrigger
                                            trigger="click"
                                            placement="right"
                                            overlay={renderChildTooltip(singleItem.category)}>
                                            <p>{singleItem.name} <img src={dropdown}></img></p>
                                        </OverlayTrigger>
                                    </>
                                }
                            </>
                        )
                    })}
                </div>
            </Tooltip>
        )
    };

    const checkoutHandler = () => {
        history.push('/checkout')
    }

    const homeHandler = () => {
        history.push('/home')
    }

    return (
        <Sticky className={classes.stickyDiv}>
            <div className={classes.offcanvas}>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header className={classes.offcanvasHeader} closeButton>
                        Menu
                    </Offcanvas.Header>
                    <Offcanvas.Body className={classes.offcanvasBody}>
                        <p onClick={homeHandler}>Home</p>
                        <p>Contact</p>
                        <p onClick={loginHandler}>{state.status !== 'not logged in' && `Hello ${state.name}`}{state.status === 'not logged in' && 'Login/Register'}</p>
                        <p onClick={checkoutHandler}>Cart</p>
                        <Accordion>


                            {category.map((singleItem, idx) => {
                                return (
                                    <Accordion.Item eventKey={`${idx}`}>
                                        <Accordion.Header>{singleItem.productType}</Accordion.Header>
                                        <Accordion.Body>
                                            {singleItem.category.map((category) => {
                                                return (
                                                    <>
                                                        {!category.category && <p onClick={() => { level1Category(category.name) }}>{category.name}</p>}
                                                        {category.category &&
                                                            <>
                                                                <Accordion>
                                                                    <Accordion.Header>{`${category.name}`}</Accordion.Header>
                                                                    <Accordion.Body>
                                                                    {category.category.map((singleItem)=>{
                                                                        return (
                                                                            <p onClick={()=>{level2Category(singleItem.parentName, singleItem.name)}}>{singleItem.name}</p>
                                                                        )
                                                                    })}
                                                                    </Accordion.Body>
                                                                </Accordion>
                                                            </>                                                        
                                                        }
                                                    </>
                                                )
                                            })}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })}
                        </Accordion>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <div className={classes.parDiv}>
                <div className={classes.parentDiv}>
                    <div className={classes.imgDiv}>
                        <img src={logo}></img>
                    </div>
                    <div className={classes.otherDiv}>
                        <div className={classes.otherDivParent}>
                            <p onClick={homeHandler}>Home</p>
                            {category.map((singleItem) => {
                                return (
                                    <OverlayTrigger
                                        trigger="click"
                                        placement="bottom"
                                        overlay={renderTooltip(singleItem.category)}>
                                        <p>{singleItem.productType}</p>
                                    </OverlayTrigger>
                                )
                            })}
                            <p>Contact</p>
                            <p onClick={checkoutHandler}>Cart</p>
                            <p onClick={loginHandler}>{state.status !== 'not logged in' && `Hello ${state.name}`}{state.status === 'not logged in' && 'Login/Register'}</p>
                        </div>
                    </div>
                    <div className={classes.otherChild}>
                        <button onClick={handleShow}><i class="fa fa-bars"></i></button>
                    </div>

                </div>
            </div>
        </Sticky>
    )
}


export default Navbar