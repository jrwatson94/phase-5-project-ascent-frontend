import React from "react";
import {Form} from 'react-bootstrap'

export default class LogIn extends React.Component {
    state ={
        name: "",  
        username: "", 
        password: ""
    }

    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    localSubmitHandler = (event) => {
        event.preventDefault() 
        this.props.submitHandler(this.state)
        console.log(this.state)
        this.setState({
            name: "",  
            username: "", 
            password: ""
        })
    }

    render(){
        return (
            <div className="login-page form-group login-div">
                <h3>Welcome to <span style={{fontFamily: 'Play'}}><strong>Ascent</strong></span></h3>
                <hr style={{backgroundColor: 'black'}}></hr>

                <form onSubmit = {this.localSubmitHandler}>
                    <Form.Group>
                        <Form.Control type ="text" name= "name" placeholder= "enter name" value= {this.state.name} onChange= {this.changeHandler}/> <br/>
                        <Form.Control type ="text" name= "username" placeholder= "enter username" value= {this.state.username} onChange= {this.changeHandler}/> <br/>
                        <Form.Control type ="password" name= "password" placeholder= "enter password" value= {this.state.password} onChange= {this.changeHandler}/><br/>
                        <Form.Control className="sign-up-button btn btn-primary" type ="submit" value ="Sign Up"/><br/>
                    </Form.Group> 
                </form>
            </div>
            
        )
    }
}