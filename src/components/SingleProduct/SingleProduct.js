import classes from './SingleProduct.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import ReactImageMagnify from 'react-image-magnify'
import Magnifier from 'react-magnifier';
import Slider from 'react-slick'
import { Container, Row, Col } from 'react-bootstrap'
import rupLight from '../../images/ruppeLightGrey.png';
import rup from '../../images/rupee.png'
import Loading from '../Loading/Loading';
import { InputGroup, FormControl, Accordion, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cartActions } from '../../Store/cart-slice';
import { userActions } from '../../Store/profile-slice';
import { useCookies } from 'react-cookie';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SingleProduct = () => {
    const params = useParams();
    const inputRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['name']);



    const profileState = useSelector((state) => {
        return state.profile.user
    })

    const cartState = useSelector((state) => {
        return state.cart.carts
    })

    console.log(cartState)

    const [pincodehandler, setPincodeHandler] = useState('false');
    const [deliverable, changeDeliverable] = useState(false);
    const [product, changeProduct] = useState(false);
    const [loading, changeLoading] = useState(false);
    const [displayImage, changeDisplayImage] = useState('');
    const [qty, changeQty] = useState(1);
    const [addLoading, changeAddLoading] = useState(false);
    let chars = [], spec = [];
    console.log(profileState)
    if (product) {
        chars = product.char.split(";");
        spec = product.spec.split(";")
    }

    useEffect(() => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWithId`, {
            headers: {
                productid: params.productId
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            let singleImage = response.product.displayimages;
            let productImages = response.product.images;
            changeDisplayImage(singleImage)
            productImages.push(singleImage);
            response.product.images = productImages
            changeProduct(response.product);
            changeLoading(false)
        })
    }, [])



    const sliderController = (item) => {
        changeDisplayImage(item);
    }

    const buttonHandler = () => {
        setPincodeHandler(false);
        const string = inputRef.current.value;
        fetch(`${process.env.REACT_APP_FETCH_LINK}/pincodeCheck`, {
            headers: {
                pincode: string
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            setPincodeHandler(response);
            changeDeliverable(false)
        })
    }


    const settings = {
        infinite: true,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        beforeChange: function (currentSlide, nextSlide) {
            console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function (currentSlide) {
            console.log("after change", currentSlide);
        }
    };

    const minusHandler = () => {
        if (qty !== 1) {
            changeQty((prevState) => {
                let index = prevState - 1;
                return index
            })
        }
    }

    const plusHandler = () => {
        changeQty((prevState) => {
            let index = prevState + 1;
            return index
        })
    }

    const buyHandler = () => {
        if (pincodehandler === 'false') {
            changeDeliverable('noInput');
        } else {
            dispatch(cartActions.addProducts({ product: product, quantity: qty }))
            history.push('/checkout')
        }
    }

    const cartHandler = () => {
        if (pincodehandler === 'false') {
            changeDeliverable('noInput');
        } else {
            if (profileState.status !== 'not logged in') {
                changeAddLoading(true);
                const data = { carts: product, userid: profileState._id, quantity: qty }
                console.log(data)
                fetch(`${process.env.REACT_APP_FETCH_LINK}/cartAssociation`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
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
                        console.log(response);
                        changeAddLoading(false)
                        dispatch(cartActions.changeProducts(response))
                        history.push("/checkout")
                    })

                })
            } else {
                console.log("hello");
                dispatch(cartActions.addProducts({ product: product, quantity: qty }))
                history.push("/checkout")
            }
        }
    }
    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (

        <>
            {loading && <Loading></Loading>}
            {!loading &&
                <div>
                    <Navbar></Navbar>
                    <div className={classes.productContainer}>
                        <Row>
                            <Col lg={'7'}>
                                <Row>
                                    <Col lg={'5'} className={classes.sliderConParent}>
                                        <div className={classes.sliderCon}>

                                            <Slider {...settings}>
                                                {product.images &&
                                                    <>
                                                        {product.images.map((item, idx) => {
                                                            return (
                                                                <div className={classes.sliderImgContainer} onClick={() => { sliderController(item) }}>
                                                                    <img src={item} alt="SliderImg" />
                                                                </div>
                                                            )
                                                        })}
                                                    </>}

                                            </Slider>
                                        </div>
                                    </Col>
                                    <Col lg={'7'}>
                                        <div className={classes.imgCon}>
                                            <ReactImageMagnify
                                                {...{
                                                    smallImage: {
                                                        alt: 'Small Image',
                                                        isFluidWidth: true,
                                                        src: displayImage
                                                    },
                                                    largeImage: {
                                                        alt: 'Large Image',
                                                        src: displayImage,
                                                        width: 1024,
                                                        height: 576
                                                    },
                                                }}
                                            >
                                            </ReactImageMagnify>
                                        </div>
                                        <div className={classes.imgConResponsive}>
                                            <Magnifier src={displayImage}></Magnifier>
                                        </div>

                                        {product.images &&
                                            <div className={classes.carouselResp}>
                                                <Carousel
                                                    autoPlay
                                                    infiniteLoop
                                                    centerMode
                                                    centerSlidePercentage={'80'}
                                                >
                                                    {product.images.map((singleItem) => {
                                                        console.log(product.images)
                                                        return (
                                                            <div className={classes.sliderImg} onClick={() => { sliderController(singleItem) }}>
                                                                <img src={singleItem} alt={"slider img"}></img>
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                        }
                                    </Col>

                                </Row>
                            </Col>
                            <Col lg={'5'}>
                                <div className={classes.contentContainer}>
                                    <div className={classes.headerDiv}>
                                        <h2 className={classes.heading}>{product.name}</h2>
                                    </div>
                                    <div className={classes.deliverParent}>
                                        <p>Deliver To:-</p>
                                        <div className={classes.inputParent}>
                                            <input ref={inputRef} placeholder={"Enter your pincode"}></input>
                                            <button onClick={buttonHandler}>{!pincodehandler && <Spinner animation='border'></Spinner>}{pincodehandler && 'Check Me'}</button>
                                        </div>
                                        {pincodehandler !== 'false' && <Alert style={{ position: 'static' }} className={'mt-3'} variant={pincodehandler.status === 'suc' ? 'info' : 'danger'}>{pincodehandler.message}</Alert>}
                                        <div className={classes.deliveryAvail}>
                                            Delivery Available in 5-7 days
                                        </div>
                                        <div className={classes.priceDiv}>
                                            <div className={classes.priceChildDiv}>
                                                <div className={classes.priceContainer}>
                                                    <div className={classes.priceContainer}>
                                                        <img src={rup}></img>
                                                        <p className={classes.price}>{product.price}</p>
                                                    </div>
                                                    <div className={classes.secContainer}>
                                                        <img src={rupLight}></img>
                                                        <p className={classes.overprice}>{product.overprice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.containerChild}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text onClick={minusHandler}>-</InputGroup.Text>
                                            <FormControl
                                                value={qty}
                                            />
                                            <InputGroup.Text onClick={plusHandler}>+</InputGroup.Text>
                                        </InputGroup>
                                    </div>
                                    {deliverable && <Alert style={{ position: 'static' }} variant={deliverable === 'noInput' ? 'danger' : 'warning'} className={'mt-3'}>Check Pincode First</Alert>}
                                    <div className={classes.btnContainer}>
                                        <button className={classes.buy} onClick={buyHandler}>Buy Now</button>
                                        <button className={classes.cart} onClick={cartHandler}>{addLoading && <Spinner animation='border'></Spinner>}{!addLoading && 'Add to Cart'}</button>
                                    </div>
                                    <div className={classes.descDiv}>
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Description</Accordion.Header>
                                                <Accordion.Body>
                                                    {product.desc}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Characterstics</Accordion.Header>
                                                <Accordion.Body>

                                                    {chars.length > 0 &&
                                                        <>
                                                            {chars.map((singleItem) => {

                                                                let ch = singleItem.split("=");

                                                                return (
                                                                    <div className={classes.flexDiv}>
                                                                        {ch.length && ch.length > 0 &&
                                                                            <>
                                                                                {ch.map((singleItem2) => {
                                                                                    return (
                                                                                        <p>{singleItem2}</p>
                                                                                    )
                                                                                })}
                                                                            </>}
                                                                    </div>
                                                                )
                                                            })}
                                                        </>}

                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>Special Features</Accordion.Header>
                                                <Accordion.Body>

                                                    {spec.length > 0 &&
                                                        <>
                                                            {spec.map((singleItem) => {

                                                                return (
                                                                    <p>{singleItem}</p>
                                                                )
                                                            })}
                                                        </>}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            }
        </>
    )
}

export default SingleProduct


// productDisplayWithId = product.js



{/* <Slider {...settings2} className={classes.sliderColContainer}>
                                             {product.images && 
                                                <>
                                                    {product.images.map((singleItem)=>{
                                                        return (
                                                            <div className={classes.sliderImg} onClick={()=>{sliderController(singleItem)}}>
                                                                <img src={singleItem} alt={"slider img"}></img>
                                                            </div>
                                                        )
                                                    })}
                                                </>}
                                            </Slider> */}