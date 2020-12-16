import React from 'react'
import { useSelector } from 'react-redux'
import ClimbCard from '../Components/ClimbCard'

class MyClimbs extends React.Component{
    state= {
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.user.id}`)
        .then(r=> r.json())
        .then(user => {
            this.setState({
                userData: user
            })
        })
    }

    renderClimbs = () => {
        if (this.state.userData){
            return this.state.userData.climbs.map(climb => <ClimbCard token ={this.props.token} user={this.props.user} {...climb}/>)
        }
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