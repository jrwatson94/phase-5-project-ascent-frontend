import React from 'react'

export default class ClimbCard extends React.Component{
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
                </div>
            </div>
        )
    }
}