import classes from './Seasonal.module.css'
import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SmallProductContainer from '../SmallProductContainer/SmallProductContainer';

const Seasonal = () => {

    const [array, changeArray] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/seasonalOrder`).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            changeArray(response)
        })
    }, [])

    return (
        <div className={classes.parentDiv}>
            <h1>Seasonal Order</h1>
            <Container className={classes.productDiv}>
                <Row>
                    {array.map((singleItem)=>{
                        return (
                            <SmallProductContainer single={singleItem}></SmallProductContainer>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Seasonal