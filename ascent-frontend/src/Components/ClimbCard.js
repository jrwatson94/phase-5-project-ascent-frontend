import React from 'react'
import {connect} from 'react-redux'
import {deleteClimb, completeClimb} from '../actions/climbActions'
import Modal from 'react-modal'
import Review from './Review'


class ClimbCard extends React.Component{
    state ={
        climbAdded: false,
        data: "",
        completed: this.props.completed,
        reviews: [],
        reviewModalOpen: false,
        reviewsModalOpen: false,
        reviewDeleted: false,
        reviewData: {
            title: "",
            stars: 1,
            content: "",
            author: localStorage.user_name,
            author_id: parseInt(localStorage.user_id),
            climb_name: this.props.name
            
        }
    }

    customStyles =()=> {
        return {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            } 
        }
    }


    addClickHandler = () => {
        let data ={
            user_id: localStorage.user_id,
            climb_id: this.props.id
        }
        fetch('http://localhost:3000/user_climbs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.setState({climbAdded: true})
        })
    }

    deleteClickHandler = () => {
        const userClimb = this.props.user_climbs.filter(user_climb => user_climb.user_id === parseInt(localStorage.user_id))
        this.props.deleteClimb(userClimb)
    }

    completeClickHandler = () => {
        const userClimb = this.props.user_climbs.filter(user_climb => user_climb.user_id === parseInt(localStorage.user_id))
        this.props.completeClimb(userClimb)
        this.setState({
            completed: true
        })
    }

    renderCompleteButton = () => {
        if (this.props.completed !== undefined){
            return (
                <>
                <button onClick={this.deleteClickHandler} className="btn">❌</button>
                <button onClick={this.completeClickHandler} className="btn">{this.state.completed ? "✅" : "Mark as Complete"}</button>
                </>
            )
        }else {
            return (
                <button onClick={this.addClickHandler} className="btn">{this.state.climbAdded ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}</button>
            )
        }
    }

    openReviewModal = () => {
        this.setState({reviewModalOpen: true})
    }
    closeReviewModal = () => {
        this.setState({reviewModalOpen: false})
    }

    reviewChangeHandler = (event) => {
        this.setState({
            ...this.state,
            reviewData: {
                ...this.state.reviewData,
                [event.target.name]: event.target.value
            }
        })
    }

    reviewSubmitHandler = (e) => {
        e.preventDefault()
        const userClimb = this.props.user_climbs.filter(user_climb => user_climb.user_id === parseInt(localStorage.user_id))
        const data = {
            ...this.state.reviewData,
            user_climb_id: userClimb[0].id
        }
        fetch('http://localhost:3000/reviews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then( () => {
            this.setState({reviewModalOpen: false})
        })
        .catch(errors => {
            console.log(errors)
        })
    }

    fetchReviewsAndRenderModal = () => {
        fetch(`http://localhost:3000/climbs/${this.props.id}/reviews`)
        .then(r => r.json())
        .then(reviews => {
            this.setState({
                reviews: reviews,
                reviewsModalOpen: true
            })
        })
    }
    closeReviewsModal = () => {
        this.setState({
            reviewsModalOpen: false
        })
    }

    renderReviewsContainer = () => {
        const reviews = this.state.reviews.filter(review => review !== null)
        if (reviews.length === 0){
            return <p>No reviews for this route..</p>
        }
        else {
            return(
                <>
                    <h4>{this.props.name}</h4>
                    <div className="container">
                        {reviews.map(review => <Review deleteReview={this.deleteReview}{...review}/>)}
                    </div>
                </>
            )
        }
    }

    deleteReview = (reviewId) => {
        let reviews;
        reviews = this.state.reviews.filter(review => review !== null && review.id !== reviewId)
        fetch(`http://localhost:3000/reviews/${reviewId}`, {
            method: "DELETE"
        })
        .then(() => {
            this.setState({
                ...this.state,
                reviews: reviews
            })
        })
    }
    
    render(){
        return(
            <>
            <div className="climb-card card float-left">
                <img className="card-img-top climb-img" src={this.props.image}></img>
                <div className="card-body">
                    <a href={this.props.url}><h4 className="card-title">{this.props.name}</h4></a>
                    <h5 className="rating">Rating: <strong>{this.props.rating}</strong></h5>
                    <p>Type: {this.props.climb_type}</p>
                    <p>Difficulty: {this.props.difficulty}</p>
                    <p>Location: {this.props.state}, {this.props.climbing_area}</p>
                    {this.renderCompleteButton()}
                    {this.state.completed ? <button onClick={this.openReviewModal} className="btn"><i className="far fa-edit"></i></button> : ""}
                    <br></br>
                    <br></br>
                    
                    <button onClick={this.fetchReviewsAndRenderModal} className="btn">Reviews</button>
                </div>
            </div>
            <Modal isOpen={this.state.reviewsModalOpen} style={this.customStyles()}>
                <button className="btn" onClick = {this.closeReviewsModal}>X</button>
                {this.renderReviewsContainer()}
            </Modal>


            <Modal isOpen= {this.state.reviewModalOpen} style={this.customStyles()}>
                <button className="btn" onClick = {this.closeReviewModal}>X</button>
                <form onSubmit={this.reviewSubmitHandler}>
                    <div className="form-group">
                        <h5>Review for <strong>{this.props.name}</strong></h5>
                        <label>Rating: </label>
                        <select onChange={this.reviewChangeHandler} value={this.state.reviewData.stars} name="stars">
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                        </select>
                        <br></br>
    
                        <label>Title: </label>
                        <input className="form-control" onChange={this.reviewChangeHandler} value={this.state.reviewData.title} name="title"></input>
                        <label>Description: </label>
                        <textarea className="form-control" onChange={this.reviewChangeHandler} value={this.state.reviewData.content} name="content"></textarea>
                        <br></br>
                        <input type="submit"></input>
                    </div>
                </form>
            </Modal>
            </>
        )
    }
}

const mdp = dispatch => {
    return {
        deleteClimb: userClimb => dispatch(deleteClimb(userClimb)),
        completeClimb: userClimb => dispatch(completeClimb(userClimb)),
    }
}


export default connect(null,mdp)(ClimbCard);