import React from 'react'
import {Form} from 'react-bootstrap'

export default class login extends React.Component {
    state ={
        username: "", 
        password: ""
    }

    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    localSubmitHandler = (event) => {
        event.preventDefault() 
        this.props.loginHandler(this.state)
        // console.log(this.state)
        this.setState({
            username: "", 
            password: ""
        })
    }

 

    render() {
        return (
            <div className="login-page form-group login-div">
                <h3>Welcome to <span style={{fontFamily: 'Play'}}><strong>Ascent</strong></span></h3>
                <hr></hr>
                <div className="error-message text-center text-danger">
                        <p>{this.props.errorMessage}</p>
                </div>
                <form className="login" onSubmit = {this.localSubmitHandler}> 
                    <Form.Group>
                        <Form.Control className="login-item" type ="text" name= "username" placeholder= "enter username" value= {this.state.username} onChange= {this.changeHandler}/> <br/>
                        <Form.Control className="login-item"  type ="password" name= "password" placeholder= "enter password" value= {this.state.password} onChange= {this.changeHandler}/><br/>
                        <Form.Control className="sign-up-button btn btn-primary" type ="submit" value ="Log In"/><br/>
                    </Form.Group>
                </form>
            </div>
            
        )
    }
}