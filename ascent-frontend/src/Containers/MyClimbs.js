import React from 'react'
import { useSelector } from 'react-redux'
import ClimbCard from '../Components/ClimbCard'
import {connect} from 'react-redux'
import {fetchMyClimbs} from '../actions/climbActions'

class MyClimbs extends React.Component{
    state= {
        render: false
    }

    componentDidMount(){
        this.props.fetchMyClimbs(localStorage.user_id)
    }

    renderClimbs = () => {
        let climbArray = this.props.my_climbs.map(climb => {
            let user_climb = climb.user_climbs.filter(user_climb => user_climb.user_id === parseInt(localStorage.user_id))
            return <ClimbCard 
                token ={this.props.token} 
                user={this.props.user} {...climb} 
                completed={user_climb[0].completed} 
            />
        })
        return climbArray
        

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

const msp = state => {
    return{
        my_climbs: state.my_climbs
    }
}

const mdp = dispatch => {
    return {
        fetchMyClimbs: user_id => dispatch(fetchMyClimbs(user_id))
    }
}

export default connect(msp,mdp)(MyClimbs);