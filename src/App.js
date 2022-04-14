import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router';
import Home from './components/Home/Home'
import SingleProduct from './components/SingleProduct/SingleProduct';
import {useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { userActions } from './Store/profile-slice';
import Checkout from './components/Checkout/Checkout'
import ProfileVerification from './components/ProfileVerification/ProfileVerification';
import Profile from './components/Profile/Profile';
import CategoryDisplay from './components/CategoryDisplay/CategoryDisplay';


function App() {

  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['name']);
  

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_FETCH_LINK}/userAuthenticated`, {
      headers: {
        jwt: cookies.jwt
      }
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response)
      dispatch(userActions.changeUser(response))
    })
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/home" exact>
          <Home></Home>
        </Route>
        <Route path="/checkout" exact>
          <Checkout></Checkout>
        </Route>
        <Route path="/singleProduct/:productId">
          <SingleProduct></SingleProduct>
        </Route>
        <Route path="/profileVerification">
          <ProfileVerification></ProfileVerification>
        </Route>
        <Route path='/categoryDisplay/:parentName/:name'>
          <CategoryDisplay></CategoryDisplay>
        </Route>
        <Route path='/categoryDisplay/:parentName'>
          <CategoryDisplay></CategoryDisplay>
        </Route>
        <Route path='/profile'>
          <Profile></Profile>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
