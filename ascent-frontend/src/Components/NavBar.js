import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../assets/logo.png'


export default class NavBar extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <img className="ascent-logo" src={logo}></img>
                <a className="navbar-nav ascent-text">
                    <NavLink to="/" className="nav-link">Ascent</NavLink>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/profile" className="nav-link">{localStorage.user_username}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search">Search</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/climbs">All Climbs</NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/map">Map</NavLink>
                        </li>
                        <li className="nav-item logout">
                            <a className="nav-link" href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}