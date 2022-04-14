import classes from './Home.module.css'
import Navbar from '../Navbar/Navbar';
import SliderCar from './SliderCar/SliderCar';
import { useState, useEffect } from 'react';
import NewArrival from '../NewArrivals/NewArrivals';
import WhyUs from '../WhyUs/WhyUs';
import Seasonal from '../Seasonal/Seasonal';
import Loading from '../Loading/Loading';

const Home = () => {

    const [loading, setLoading] = useState(false)
    const [products, changeProducts] = useState([]);

    useEffect(() => {
      setLoading(true)
      fetch(`${process.env.REACT_APP_FETCH_LINK}/productNew`).then((response)=>{
          return response.json()
      }).then((response)=>{
          console.log(response);
          changeProducts(response.records);
          setLoading(false)
      })
    }, [])
    

    return  (
        <>
        {loading && <Loading></Loading>}
        {!loading && 
        <div className={classes.parentDiv}>
            <Navbar></Navbar>
            <SliderCar></SliderCar>
            <NewArrival products={products}></NewArrival>
            <WhyUs></WhyUs>
            <Seasonal></Seasonal>
        </div>}
        
        </>
    )
}

export default Home








// new arrivals - product.js backend