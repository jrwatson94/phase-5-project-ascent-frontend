export const fetchClimbs = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_CLIMBS'})
      fetch('http://localhost:3000/climbs').then(response => {
        return response.json()
      }).then(data => {
        dispatch({ type: 'ADD_CLIMBS', climbs: data })
      })
    }
}