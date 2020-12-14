import React from 'react'
import ClimbCard from '../Components/ClimbCard'

export default class ClimbContainer extends React.Component{
    renderClimbs = () => {
        return <ClimbCard />
    }
    render(){
        return(
            <div>
                <h1>Climb Container</h1>
                {this.renderClimbs()}
            </div>
        )
    }
}