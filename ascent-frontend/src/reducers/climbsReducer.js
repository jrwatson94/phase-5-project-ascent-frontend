const climbsReducer = (state = {climbs: [], loading: false}, action) => {
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
        default:
            return state
    }
}
export default climbsReducer;