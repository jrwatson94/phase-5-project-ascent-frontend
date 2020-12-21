import React from 'react'
import {connect} from 'react-redux'
import {deleteClimb, completeClimb} from '../actions/climbActions'


class ClimbCard extends React.Component{
    state ={
        data: "",
        completed: this.props.completed
    }

    addClickHandler = () => {
        let data ={
            user_id: localStorage.user_id,
            climb_id: this.props.id
        }
        fetch('http://localhost:3000/user_climbs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
    }

    deleteClickHandler = () => {
        const userClimb = this.props.user_climbs.filter(user_climb => user_climb.user_id === parseInt(localStorage.user_id))
        this.props.deleteClimb(userClimb)
    }

    completeClickHandler = () => {
        const userClimb = this.props.user_climbs.filter(user_climb => user_climb.user_id === parseInt(localStorage.user_id))
        this.props.completeClimb(userClimb)
        this.setState({
            completed: true
        })
    }

    renderCompleteButton = () => {
        if (this.props.completed != undefined){
            return (
                <>
                <button onClick={this.deleteClickHandler} className="btn">Delete</button>
                <button onClick={this.completeClickHandler} className="btn">{this.state.completed ? "Complete ✅" : "Mark as Complete"}</button>
                </>
            )
        }
    }

    render(){
        return(
            <div className="climb-card card float-right">
                <img className="card-img-top climb-img" src={this.props.image}></img>
                <div className="card-body">
                    <a href={this.props.url}><h4 className="card-title">{this.props.name}</h4></a>
                    <h5 className="rating">Rating: <strong>{this.props.rating}</strong></h5>
                    <p>Type: {this.props.climb_type}</p>
                    <p>Difficulty: {this.props.difficulty}</p>
                    <p>Location: {this.props.state}, {this.props.climbing_area}</p>
                    <button onClick={this.addClickHandler} className="btn">Add To MyClimbs</button>
                    {this.renderCompleteButton()}
                </div>
            </div>
        )
    }
}

const mdp = dispatch => {
    return {
        deleteClimb: userClimb => dispatch(deleteClimb(userClimb)),
        completeClimb: userClimb => dispatch(completeClimb(userClimb))
    }
}


export default connect(null,mdp)(ClimbCard);