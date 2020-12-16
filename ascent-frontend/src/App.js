import './App.css';
import React from 'react'
import NavBar from './Components/NavBar'
import ClimbContainer from './Containers/ClimbsContainer'
import SearchForm from './Components/SearchForm'
import Footer from './Components/Footer'
import Home from './Components/Home'
import { BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'
import Signup from './auth/SignUp'
import Login from './auth/LogIn'
import MyClimbs from './Containers/MyClimbs'


class App extends React.Component{
  state = {
    user: null 
  }
  signupSubmitHandler = (newUser) => {
    console.log(newUser)
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
  
      },
      body: JSON.stringify(newUser)
      })
      .then(r => r.json())
      .then(newUserObj => {
        this.setState({user:newUserObj.user}
          , () => this.props.history.push('/climbs'))
        localStorage.setItem("token", newUserObj.jwt)
  
      });
  }
  
  loginHandler = (userLogin) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userLogin)
      })
      .then(r => r.json())
      .then(loggedInUser => {
        localStorage.setItem("token", loggedInUser.jwt)
        this.setState({user:loggedInUser.user}
          , () => this.props.history.push('/climbs')
          )
      })
  }
  render(){
    return(
      <Switch>
        <div>
          <NavBar/>
          <Route exact path="/signup"render={() => <Signup submitHandler = {this.signupSubmitHandler}/>}/>
          <Route exact path="/login" render={() => <Login loginHandler = {this.loginHandler}/>}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/search" component={SearchForm}/>
          <Route exact path="/climbs" render= {() => <ClimbContainer token={localStorage.token} user={this.state.user}/>} />
          <Route exact path="/my-climbs"render={() => <MyClimbs token={localStorage.token} user= {this.state.user}/>}/>
          <Footer/> 
        </div>
      </Switch>
      
    )
  }
}

export default withRouter(App)
