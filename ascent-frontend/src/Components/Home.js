import React from 'react'
import {NavLink} from 'react-router-dom'

class Home extends React.Component {
    renderButtons = () => {
        console.log(localStorage)
        if (localStorage.user_id){
            return (
                <div>
                    <h1>Welcome {localStorage.user_name}</h1>
                </div>
            )
        }else {
            return (
                <div className="home-buttons-container d-flex justify-content-center">
                    <button className="btn-light home-button">
                        <NavLink to = "/signup">Create an Account</NavLink>
                    </button>
                    <button className="btn-light home-button">
                        <NavLink  to = "/login"> Sign In</NavLink>
                    </button>
                </div>
            )
        }

    }
    render() {
        return (
            <div>
                {this.renderButtons()}
            </div>
        )

    }
}

export default Home