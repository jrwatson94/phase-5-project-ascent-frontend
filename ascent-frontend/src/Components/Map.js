import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import {connect} from 'react-redux'
import {fetchClimbs} from '../actions/climbActions'



function BasicMap(){
    const climbs = useSelector(state => state.climbs)
    const [selectedClimb, setSelectedClimb]= useState(null);
    const clickHandler = () => {
        let data ={
            user_id: localStorage.user_id,
            climb_id: selectedClimb.id
        }
        fetch('http://localhost:3000/user_climbs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
    }
    return (
        <GoogleMap defaultZoom={8} defaultCenter={{lat:40.678177, lng:-73.944160  }}>
            {climbs.map(climb => 
                <Marker 
                    key={climb.id} 
                    position={{lat: climb.lat, lng: climb.long}}
                    onClick={() => {setSelectedClimb(climb)}}
                />
            )}
            {selectedClimb && (
                <InfoWindow 
                    position={{lat: selectedClimb.lat, lng:selectedClimb.long}}
                    onCloseClick={ () => {
                        setSelectedClimb(null);
                    }}
                >
                    <div>
                        <img className="map-img" src={selectedClimb.image}></img>
                        <hr></hr>
                        <h6><a href={selectedClimb.url}>{selectedClimb.name}</a> <span>({selectedClimb.difficulty})</span></h6>
                        <p>{selectedClimb.climb_type}</p>
                        <p>Rating: &#9733;<strong>{selectedClimb.rating}</strong></p>
                        <p>{selectedClimb.state}, {selectedClimb.climbing_area}</p>
                        <button onClick={clickHandler}>Add to MyClimbs</button>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}


const WrappedMap = withScriptjs(withGoogleMap(BasicMap))

class Map extends React.Component{
    // const climbs = useSelector(state => state)
    componentDidMount(){
        this.props.fetchClimbs()
    }
    render(){
        return(
            <div style={{witdth: '100vw', height: '100vh'}}>
                <WrappedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement = {<div style={{height: '100%'}}></div>}
                    containerElement = {<div style={{height: '100%'}}></div>}
                    mapElement = {<div style={{height: '100%'}}></div>}
                />
            </div>
        )
    }
    }

const msp = state => {
    return {
        climbs: state.climbs,
        loading: state.loading
    }
}

const mdp = dispatch => {
    return {
        fetchClimbs: () => dispatch(fetchClimbs())
    }
}


export default connect(msp,mdp)(Map,BasicMap);