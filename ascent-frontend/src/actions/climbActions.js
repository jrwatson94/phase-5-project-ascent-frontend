export const fetchClimbs = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_CLIMBS'})
      fetch('http://localhost:3000/climbs')
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch({ type: 'ADD_CLIMBS', climbs: data })
      })
    }
}

export const fetchMyClimbs = (user_id) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/users/${user_id}`)
        .then(r=> r.json())
        .then(data => {
          console.log(data.climbs)
          dispatch({type: "ADD_MY_CLIMBS", my_climbs: data.climbs})
        })
  }
}

export const deleteClimb = (userClimb) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/user_climbs/${userClimb[0].id}`, {
      method: "DELETE"
    })
    dispatch({type: "DELETE_CLIMB", climb_id: userClimb[0].climb_id})
  }
}

export const completeClimb = (userClimb) => {
  return (dispatch) => {
    const data = {
      user_id: localStorage.user_id,
      climb_id: userClimb[0].climb_id,
      completed: true
    }
    fetch(`http://localhost:3000/user_climbs/${userClimb[0].id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then( r=> r.json())
    .then(data => {
      console.log(data)
      dispatch({type: "COMPLETE_CLIMB", climb: data})
    })

  }
}