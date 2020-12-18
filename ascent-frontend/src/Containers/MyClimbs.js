import React from 'react'
import { useSelector } from 'react-redux'
import ClimbCard from '../Components/ClimbCard'

class MyClimbs extends React.Component{
    state= {
        render: false
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.user.id}`)
        .then(r=> r.json())
        .then(user => {
            this.setState({
                ...this.state,
                userData: user
            })
        })
    }

    renderClimbs = () => {
        if (this.state.userData){
            let climbArray = this.state.userData.climbs.map(climb => {
                let user_climb = climb.user_climbs.filter(user_climb => user_climb.user_id === this.props.user.id)
                return <ClimbCard 
                    token ={this.props.token} 
                    user={this.props.user} {...climb} 
                    completed={user_climb[0].completed} 
                    completeClimb={this.completeClimb}
                    deleteClimb = {this.deleteClimb}
                />
            })
            return climbArray
        }

    }

    completeClimb = (userClimb) => {
        const data = {
            user_id: this.props.user.id,
            climb_id: userClimb[0].climb_id,
            completed: true
        }
        fetch(`http://localhost:3000/user_climbs/${userClimb[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(data)
        })

    }

    deleteClimb = (userClimb) => {
        fetch(`http://localhost:3000/user_climbs/${userClimb[0].id}`, {
                method: "DELETE"
        })
        // .then(r=> r.json())
        // .then(() => {
        //     this.setState({
        //         ...this.state,
        //         render: true
        //     })
        // })
    }

    render(){
        return(
            <div className="container">
                <h1>My Climbs</h1>
                {this.renderClimbs()}
            </div>
        )
    }
}

export default MyClimbs