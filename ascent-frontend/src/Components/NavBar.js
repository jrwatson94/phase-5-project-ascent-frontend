import React from 'react'
import {NavLink} from 'react-router-dom'


export default class NavBar extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Ascent</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" href="#">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search">Search</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/climbs">All Climbs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/my-climbs">My Climbs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/map">Map</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}