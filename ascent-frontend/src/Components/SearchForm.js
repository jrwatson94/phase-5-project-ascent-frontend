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
    }

    renderSearchResults = (searchTerm) => {
        let input = this.state.userInput.toLowerCase()
        let filteredArray = this.state.currentClimbs.filter(climb => 
            climb[searchTerm].toLowerCase().includes(input) 
        )
        return (
            <div className="container">
                {filteredArray.map(climb => <ClimbCard key={climb.id} user={this.props.user} {...climb}/>)}
            </div>
        )
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
            <div className="search-form-div container">
                <form onSubmit={this.submitHandler}>
                    <div className="form-group mt-2">
                        <label><h2>Search</h2></label>
                        <br></br>

                        <div className="form-check float-left">
                            <input onChange={this.checkChangeHandler} className="form-check-input" name="climb-search" type="radio" value="state"></input>
                            <label>Location</label>
                        </div>
                        <div onChange={this.checkChangeHandler} className="form-check float-left">
                            <input className="form-check-input" name="climb-search" type="radio" value="climb_type"></input>
                            <label>Type</label>
                        </div>
                        <div onChange={this.checkChangeHandler} className="form-check float-left">
                            <input className="form-check-input" name="climb-search" type="radio" value="name"></input>
                            <label>Name</label>
                        </div>
                        <input name="userInput" onChange={this.changeHandler} className="form-control"></input>
                    </div>
                </form>
                    {this.renderSearchResults(this.state.checkBox)}
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