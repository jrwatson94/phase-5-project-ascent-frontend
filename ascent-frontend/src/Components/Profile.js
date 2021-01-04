import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchUser,updateUser,deleteUser } from '../actions/climbActions'
import MyClimbs from '../Containers/MyClimbs'


class Profile extends React.Component{
    state = {
        bio: localStorage.user_bio,
        interests: localStorage.user_interests,
        submitted: false
    }
    componentDidMount(){
        this.props.fetchUser()
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            submitted: false
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        localStorage.setItem("user_interests", this.state.interests)
        localStorage.setItem("user_bio",this.state.bio)
        this.props.updateUser(this.state)
        this.setState({
            submitted: true
        })
    }
    bioInputValue = () => {
        return this.state.bio ? this.state.bio : ""
    }
    renderUserData = () => {
        if (this.props.currentUser){
            return(
                <form onSubmit={this.submitHandler}>
                    <div className="form-group profile-data border text-left">
                        <h3>Bio</h3>
                        <div className="profile-bio text-center border">
                            <input onChange={this.changeHandler} name="bio" className="form-control" value={this.state.bio}></input>
                        </div>
                        <h3>Interests</h3>
                        <div className="profile-bio text-center border">
                            <input onChange={this.changeHandler} name="interests" className="form-control" value={this.state.interests}></input>
                        </div>
                    </div>
                    <button className="btn border btn-primary" type="Submit"> Save Profile {this.state.submitted ? ' ✅' : ""}</button><br></br>
                </form>
            )
        }else{
            return <h5>Loading User Data...</h5>
        }
    }
    render(){
        return(
            <div className="container">
                <div className="profile border text-center">
                    <img className="profile-pic" src="https://icon-library.com/images/generic-profile-icon/generic-profile-icon-10.jpg"></img>
                    <h5>{this.props.currentUser ? this.props.currentUser.name : ""}</h5>
                    {this.renderUserData()}
                    <Link to="/logout">
                        <button onClick={this.props.deleteUser} className="btn btn-danger">Delete Account</button>
                    </Link>
                </div>
                <br></br>
                <MyClimbs />
                

            </div>
        )
    }
}

const msp = state => {
    return {
        currentUser: state.currentUser
    }
}

const mdp = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser()),
        updateUser: (userData) => dispatch(updateUser(userData)),
        deleteUser: () => dispatch(deleteUser())
    }
}

export default connect(msp,mdp)(Profile);