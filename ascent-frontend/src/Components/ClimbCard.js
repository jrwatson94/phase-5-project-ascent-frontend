import React from 'react'

export default class ClimbCard extends React.Component{
    state ={
        data: ""

    }
    addClickHandler = () => {
        let data ={
            user_id: this.props.user.id,
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
        .then(r => r.json())
        .then(data => {
            this.setState({
                data: data
            })
        })
    }
    deleteClickHandler = () => {
        let foundUserClimb
        fetch(`http://localhost:3000/user_climbs`)
        .then(r=> r.json())
        .then(userClimbs => {
            foundUserClimb = userClimbs.filter(userClimb => userClimb.user_id === this.props.user.id && userClimb.climb_id === this.props.id)
            console.log(foundUserClimb)
        })
        .then( () => {
            fetch(`http://localhost:3000/user_climbs/${foundUserClimb[0].id}`, {
                method: "DELETE"
            })
        })
    }
    render(){
        return(
            <div className="climb-card card float-right">
                <img className="card-img-top climb-img" src={this.props.image}></img>
                <div className="card-body">
                    <h4 className="card-title">{this.props.name}</h4>
                    <h5 className="rating">Rating: <strong>{this.props.rating}</strong></h5>
                    <p>Type: {this.props.climb_type}</p>
                    <p>Difficulty: {this.props.difficulty}</p>
                    <p>Location: {this.props.state}, {this.props.climbing_area}</p>
                    <button onClick={this.addClickHandler} className="btn">Add To MyClimbs</button>
                    <button onClick={this.deleteClickHandler} className="btn">Delete</button>
                </div>
            </div>
        )
    }
}