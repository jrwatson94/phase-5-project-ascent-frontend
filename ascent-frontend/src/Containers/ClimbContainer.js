import React from 'react'
import ClimbCard from '../Components/ClimbCard'
import {connect} from 'react-redux'
import {fetchClimbs} from '../actions/climbActions'

class ClimbContainer extends React.Component{
    componentDidMount(){
        this.props.fetchClimbs()
    }
    
    renderClimbs = () => {
        return this.props.climbs.map(climb => <ClimbCard key={climb.id} token={this.props.token} user={this.props.user} {...climb}/>)
    }
    render(){
        return(
            <div className="container d-flex">
                <div className="row">
                    <div className="col-12">
                        {this.renderClimbs()}
                    </div>
                </div>
            </div>
        )
    }
}

const msp = state => {
    return {
        climbs: state.climbs,
        loading: state.loading
    }
}

const mdp = dispatch => {
    return {
        fetchClimbs: () => dispatch(fetchClimbs())
    }
}

export default connect(msp,mdp)(ClimbContainer);