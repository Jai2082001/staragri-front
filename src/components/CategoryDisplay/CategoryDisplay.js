import classes from './CategoryDisplay.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'
import SmallProductContainer from '../SmallProductContainer/SmallProductContainer'
import Loading from '../Loading/Loading'

const CategoryDisplay = () => {

    const params = useParams()

    const [array, changeArray] = useState([]);
    const [loading, setLoading] = useState(false)

    console.log(params.parentName);
    console.log(params.name)

    useEffect(()=>{
        setLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplaySeed`, {
            headers: {
                parentname: params.parentName,
                name: params.name
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            changeArray(response)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading && <Loading></Loading>}
            {!loading && 
                <div className={classes.categoryDiv}>
                <Navbar></Navbar>
                <Container className='mt-4'>
                    <Row>
                        {array.map((singleItem)=>{
                            return (
                            <SmallProductContainer single={singleItem}></SmallProductContainer>
                            )
                        })}
                    </Row>
                </Container>
            </div>
            }
            
        </>
    )
}

export default CategoryDisplay