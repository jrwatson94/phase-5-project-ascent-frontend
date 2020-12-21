const climbsReducer = (state = {climbs: [], my_climbs: [], loading: false}, action) => {
    switch(action.type){
        case "LOADING_CLIMBS":
            return {
                ...state,
                climbs: [...state.climbs],
                loading: true
            }
        case "ADD_CLIMBS": 
            return {
                ...state,
                climbs: action.climbs,
                loading: false
            }
        case "ADD_MY_CLIMBS":
            return {
                ...state,
                my_climbs: action.my_climbs
            }

        case "DELETE_CLIMB":
            let newClimbArray = state.my_climbs.filter(climb => climb.id != action.climb_id)

            return {
                ...state,
                my_climbs: newClimbArray
            }

        default:
            return state
    }
}
export default climbsReducer;