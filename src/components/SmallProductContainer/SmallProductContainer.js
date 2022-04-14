import classes from './SmallProductContainer.module.css'
import {Col} from 'react-bootstrap'
import rup from '../../images/rupee.png'
import rupLight from '../../images/ruppeLightGrey.png'
import { useHistory} from 'react-router-dom'


const SmallProductContainer = ({single}) => {
    console.log(single)
    const history = useHistory();
    const parentHandler = () => {
        history.push(`/singleProduct/${single._id}`)
    }

    return (
        <Col xl={3} lg={3} md={6}>
            <div className={classes.parentContainer} onClick={parentHandler}>
                <div className={classes.imgContainer}>
                    <img src={single.displayimages}></img>
                </div>
                <hr></hr>
                <div className={classes.parentContentContainer}>
                <div className={classes.nameContainer}>
                    <p>{single.name}</p>
                </div>
                <div className={classes.priceContainer}>
                    <div>
                        <img src={rup}></img>
                        <p className={classes.price}>{single.price}</p>
                    </div>
                    <div className={classes.secContainer}>
                        <img src={rupLight}></img>
                        <p className={classes.overprice}>{single.overprice}</p>
                    </div>
                </div>
                <button>View Product</button>
                </div>
            </div>
        </Col>
    )
}

export default SmallProductContainer