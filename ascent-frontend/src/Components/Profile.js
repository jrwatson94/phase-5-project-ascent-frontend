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
                    <div className="form-group profile-data text-left">
                        <h3>Bio</h3>
                        <div className="profile-bio text-center ">
                            <textarea onChange={this.changeHandler} name="bio" className="form-control profile-form" value={this.state.bio}></textarea>
                        </div>
                        <h3 className="mt-4">Interests</h3>
                        <div className="profile-bio text-center">
                            <textarea onChange={this.changeHandler} name="interests" className="form-control profile-form" value={this.state.interests}></textarea>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="Submit"> Save Profile {this.state.submitted ? ' ✅' : ""}</button><br></br>
                </form>
            )
        }else{
            return <h5>Loading User Data...</h5>
        }
    }
    render(){
        return(
            <div className="profile-div container">
                <div className="profile text-center">
                {/* "https://icon-library.com/images/generic-profile-icon/generic-profile-icon-10.jpg" */}
                    <img className="profile-pic" src= "data:image/jpeg;base64,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"></img>
                    <h3>{this.props.currentUser ? this.props.currentUser.name : ""}</h3>
                    {this.renderUserData()}
                    <Link to="/logout">
                        <button onClick={this.props.deleteUser} className="btn btn-danger mb-4">Delete Account</button>
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