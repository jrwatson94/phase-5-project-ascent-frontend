import React from 'react'


class Review extends React.Component{

    localClickHandler = () => {
        this.props.deleteReview(this.props.id)
    }
    deleteButton = () => {
        if (this.props.author_id === parseInt(localStorage.user_id)){
            return <button onClick={this.localClickHandler} className="btn">Delete</button>
        }
    }

    render(){
        return (
            <div className="card review">
                <div className="card-body">
                    <h3><u>{this.props.title}</u></h3>
                    <h5> By: {this.props.author}</h5>
                    <p>Rating: {this.props.stars}/5 ★</p>
                    {this.props.content}
                    <br></br>
                    {this.deleteButton()}
                </div>
            </div>
        )
    }
}

export default Review;