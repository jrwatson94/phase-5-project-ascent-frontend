import './App.css';
import React from 'react'
import NavBar from './Components/NavBar'
import ClimbContainer from './Containers/ClimbContainer'
import SearchForm from './Components/SearchForm'
import Home from './Components/Home'
import { BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'
import Signup from './auth/SignUp'
import Login from './auth/LogIn'
import MyClimbs from './Containers/MyClimbs'
import Map from './Components/Map'
import Profile from './Components/Profile'
import ProfileEdit from './Components/ProfileEdit';



class App extends React.Component{
  state = {
    user: null 
  }
  signupSubmitHandler = (newUser) => {
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
        this.setLocalStorage(newUserObj)
        this.setState({user:newUserObj.user}
          , () => this.props.history.push('/'))
      })
      .catch(errors => {
        console.log(errors)
      })
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
        this.setLocalStorage(loggedInUser)
        this.setState({user:loggedInUser.user}
          , () => this.props.history.push('/')
          )
      })
      .catch(errors => {
        if (errors){
          this.setState({
            errorMessage: "Password or Username is Invalid"
          })
        }
      })
  }

  setLocalStorage = (userObj) => {
    localStorage.setItem("token", userObj.jwt)
    localStorage.setItem("user_name", userObj.user.name)
    localStorage.setItem("user_username", userObj.user.username)
    localStorage.setItem("user_id",userObj.user.id)
    localStorage.setItem("user_interests",userObj.user.interests)
    localStorage.setItem("user_bio",userObj.user.bio)
  }
  
  logout = () => {
    localStorage.clear()
    return (
      <Home />
    )
  }
  render(){
    return(
      <Switch>
        <div>
          <NavBar/>
          <Route exact path="/signup"render={() => <Signup submitHandler = {this.signupSubmitHandler}/>}/>
          <Route exact path="/login" render={() => <Login loginHandler = {this.loginHandler} errorMessage={this.state.errorMessage}/>}/>
          <Route exact path="/" render={() => <Home />}/>
          <Route exact path="/profile" render={() => localStorage.user_id ? <Profile /> : <Home />}/>
          <Route exact path="/profile/edit" render={() => localStorage.user_id ? <ProfileEdit /> : <Home />}/>
          <Route exact path="/search" render={() => localStorage.user_id ? <SearchForm user={this.state.user}/> : <Home/>}/>
          <Route exact path="/climbs" render= {() => localStorage.user_id ? <ClimbContainer token={localStorage.token} user={this.state.user}/> : <Home/>} />
          <Route exact path="/my-climbs"render={() => localStorage.user_id ? <MyClimbs token={localStorage.token} user= {this.state.user}/> : <Home/>} />
          <Route exact path="/map" render ={() => localStorage.user_id ? <Map/> : <Home/>}/>
          <Route exact path ="/logout" render = {() => this.logout()}/>
        </div>
      </Switch>
      
    )
  }
}


export default withRouter(App)
