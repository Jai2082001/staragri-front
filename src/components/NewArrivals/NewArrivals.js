import { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import SmallProductContainer from '../SmallProductContainer/SmallProductContainer'
import classes from './NewArrivals.module.css'

const NewArrival = ({products}) => {
    
    return (
        <div className={classes.parentDiv}>
            <h1>New Arrivals</h1>
            <div className={classes.productDisplay}>
                <Container>
                    <Row>
                    {products.map((singleItem)=>{
                        return (
                            <SmallProductContainer single={singleItem}></SmallProductContainer>
                        )
                    })}
                    </Row>
             
                </Container>
            </div>
        </div>
    )
}

export default NewArrival