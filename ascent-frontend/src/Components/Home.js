import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchClimbs} from '../actions/climbActions'
import Carousel from 'react-bootstrap/Carousel'
import LogIn from '../auth/LogIn'

class Home extends React.Component {
    state = {
    }
    componentDidMount(){
        this.props.fetchClimbs()
        fetch('http://localhost:3000/reviews')
        .then(r => r.json())
        .then(reviews => {
            this.setState({
                reviews: reviews
            })
        })
    }
    renderButtons = () => {
        if (localStorage.user_id){
            return (
                <>
                    <h1 className="text-center home-title">Ascent</h1>
                    <hr></hr>
                    {this.renderCarousel()}
                    <div className="row bg-dark text-light">
                        <div className="col-5">
                            {this.renderHomeContent()}
                        </div>
                        <div className="col-7">
                            {this.renderFeaturedReviews()}
                        </div>
                    </div>
                </>
            )
        }else {
            return (
                <div className="login-page">
                    <h3>Welcome to <span style={{fontFamily: 'Play'}}><strong>Ascent</strong></span></h3>
                <hr></hr>
                    <button className="btn btn-primary mb-2 mt-2 home-button btn-light">
                        <NavLink to = "/login">Log In</NavLink>
                    </button>
                    <br></br>
                    
                    <button className="btn btn-primary mb-2 mt-2 home-button btn-light">
                        <NavLink to = "/signup">Create an Account</NavLink>
                    </button>
                </div>
            )
        }

    }
    renderCarousel = () => {
        if (this.props.climbs.length > 0){
            return (
                <Carousel className="bg-dark ">
                    {this.props.climbs.map(climb => 
                        <Carousel.Item>
                            <img
                                className="d-block carousel-img"
                                src= {climb.image}
                            />
                            <Carousel.Caption>
                                <h3>{climb.name}</h3>
                                <p>{climb.climbing_area}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        )}
                </Carousel>
            )
        }else{
            return <p>Loading content...</p>
        }
    }

    renderClimbsList = () => {
        let list = []
        if (this.props.climbs.length > 0){
            for (let i = 0; i < 19; i++) {
                list.push(<li><a className="home-link" href={this.props.climbs[i].url}>{this.props.climbs[i].name}</a></li>)
            }
            return list;
        }
    }

    renderHomeContent = () => {
        return (
            <div >
                <h3>Top 20 Climbs</h3>
                <hr></hr>
                <ol>
                    {this.renderClimbsList()}
                </ol>
            </div>
        )
    }
    
    renderReviews = () => {
        let reviewsArray = []
        if (this.state.reviews && this.state.reviews.length > 0){
            for (let i = 0; i < 3; i++) {
                const review = this.state.reviews.sample()
                reviewsArray.push(
                    <div className="featured-review">
                        <div className="container">
                            <h3>{review.climb_name}</h3>
                            <hr></hr>
                            <h5>{review.title} ({review.stars} ★)</h5>
                            <h6>By: {review.author}</h6>
                            <p>{review.content}</p>
                        </div>
                    </div>
                )
            }
        }
        return reviewsArray;
    }

    renderFeaturedReviews = () => {
        return (
            <div >
                <h3>Featured Reviews</h3>
                <hr></hr>
                {this.renderReviews()}
            </div>
        )
    }
    

    render() {
        
        return (
            <div className="home-container container">
                {this.renderButtons()}
            </div>
        )

    }
}

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

const msp = state => {
    return {
        climbs: state.climbs
    }
}

const mdp = dispatch => {
    return {
        fetchClimbs: () => dispatch(fetchClimbs())
    }
}

export default connect(msp,mdp)(Home);