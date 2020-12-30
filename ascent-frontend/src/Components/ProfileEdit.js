import React from 'react'
import { connect } from 'react-redux'
import {fetchUser,updateUser, deleteUser} from '../actions/climbActions'
import {Link} from 'react-router-dom'

class ProfileEdit extends React.Component{
    componentDidMount(){
        this.props.fetchUser()
        console.log(this.props)
    }

    state = {
        name: this.props.currentUser.name,
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        interests: this.props.currentUser.interests,
        submitted: false
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.updateUser(this.state)
        this.setState({
            submitted: true
        })
    }
    renderForm = () => {
        console.log(this.state)
        if (this.props.currentUser){
            return (
                <form onSubmit={this.submitHandler}>
                    <label>Bio: </label>
                    <textarea onChange={this.changeHandler} name="bio" value={this.state.bio}></textarea><br></br>
                    <label>Interests: </label>
                    <textarea onChange={this.changeHandler} name="interests" value={this.state.interests}></textarea><br></br>
                    <button className="btn border" type="Submit">Submit{this.state.submitted ? ' ✅' : ""}</button><br></br>
                    <Link to="/logout">
                        <button onClick={this.props.deleteUser} className="btn btn-danger">Delete Account</button>
                    </Link>
                        
                    
                </form>
            )
        }else{
            return <h1>Loading...</h1>
        }
    }
    render(){
        return (
            <div className="container text-center profile-form">
                {this.renderForm()}
            </div>
          
        )
    }
}

const mdp = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser()),
        updateUser: (userData) => dispatch(updateUser(userData)),
        deleteUser: () => dispatch(deleteUser())
    }
}

const msp = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(msp,mdp)(ProfileEdit);