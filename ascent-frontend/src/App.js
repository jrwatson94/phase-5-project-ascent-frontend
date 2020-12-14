import './App.css';
import React from 'react'
import NavBar from './Components/NavBar'
import ClimbContainer from './Containers/ClimbsContainer'
import SearchForm from './Components/SearchForm'
import Footer from './Components/Footer'

export default class App extends React.Component{
  render(){
    return(
      <div>
        <NavBar/>
        <ClimbContainer/>
        <SearchForm/>
        <Footer/> 
      </div>
      
    )
  }
}
