import React from 'react'
import { connect } from 'react-redux'
import ClimbCard from './ClimbCard'

class SearchForm extends React.Component{
    state = {
        userInput: "",
        currentClimbs: this.props.climbs,
        checkBox: "state"
    }
    changeHandler = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
        console.log(this.state)
    }

    renderSearchResults = (searchTerm) => {
        let input = this.state.userInput.toLowerCase()
        console.log(this.state.currentClimbs)
        let filteredArray = this.state.currentClimbs.filter(climb => 
            climb[searchTerm].toLowerCase().includes(input) 
        )
        return filteredArray.map(climb => <ClimbCard key={climb.id} user={this.props.user} {...climb}/>)
    }
    checkChangeHandler = (evt) => {
        this.setState({
            ...this.state,
            checkBox: evt.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label>Search By: </label>
                        <div className="form-check">
                            <input onChange={this.checkChangeHandler} className="form-check-input" name="climb-search" type="radio" value="state"></input>
                            <label>Location</label>
                        </div>
                        <div onChange={this.checkChangeHandler} className="form-check">
                            <input className="form-check-input" name="climb-search" type="radio" value="name"></input>
                            <label>Name</label>
                        </div>
                        <div onChange={this.checkChangeHandler} className="form-check">
                            <input className="form-check-input" name="climb-search" type="radio" value="climb_type"></input>
                            <label>Type</label>
                        </div>
                        <input name="userInput" onChange={this.changeHandler} className="form-control"></input>
                    </div>
                </form>
                <div>
                    {this.renderSearchResults(this.state.checkBox)}
                </div>
                
            </div>
        )
    }
}

const msp = state => {
    return {
        climbs: state.climbs
    }
}

export default connect(msp,null)(SearchForm);