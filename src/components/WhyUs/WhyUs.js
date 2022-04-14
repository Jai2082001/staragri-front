import classes from './WhyUs.module.css'
import { Container, Row, Col } from 'react-bootstrap'

const WhyUs = () => {
    return (
        <div className={classes.parentDiv}>
            <h1>Why Us?</h1>
            <Container>
                <Row>
                    <Col lg={'3'}>
                        <div className={classes.childDiv}>
                            <div className={classes.iconDiv}>
                                <i class="fa fa-thumbs-up"></i>
                            </div>
                            <div className={classes.contentDiv}>
                                <h5>Authentic Products</h5>
                                <p>Each product goes through multiple rounds of quality check</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={'3'}>
                        <div className={classes.childDiv}>
                            <div className={classes.iconDiv}>
                                <i class="fa fa-hand-peace-o"></i>
                            </div>
                            <div className={classes.contentDiv}>
                                <h5>{'Safe & Secure Experience'}</h5>
                                <p>64bit of the user data and completely secure payments</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={'3'}>
                        <div className={classes.childDiv}>
                            <div className={classes.iconDiv}>
                                <i class="fa fa-inr"></i>
                            </div>
                            <div className={classes.contentDiv}>
                                <h5>Best Prices</h5>
                                <p>Unmatched prices for the highest quality products</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={'3'}>
                        <div className={classes.childDiv}>
                            <div className={classes.iconDiv}>
                                <i class="fa fa-truck"></i>
                            </div>
                            <div className={classes.contentDiv}>
                                <h5>Quick Delivery</h5>
                                <p>Lightning-fast delivery across most PIN codes</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WhyUs