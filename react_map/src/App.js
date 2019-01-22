import React, { Component } from 'react';

import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import firebase from 'firebase';
import {config} from './config';
import { nameOfAnimation as Menu } from 'react-burger-menu'



class App extends Component {

  constructor() {
    super();

    this.app=firebase.initializeApp(config);
    this.lat=this.app.database().ref().child("lat")
    this.lng=this.app.database().ref().child("lng")
this.data=this.app.database().ref().child("data")
this.dis=this.app.database().ref().child("dis")


    // console.log(this.app.database().ref().child("data"))
    this.state = {
      lat: 6.9271,
      lng:79.8612,
      data:10,
      value:5, 
      dis:4,
    };
  }
  
componentDidMount(){
  console.log("runnnn");
  
  this.lat.on('value',snap => {
    console.log("changed");
    this.setState({
      lat:parseFloat(snap.val())
    })
  })
 

 this.lng.on('value',snap => {
    console.log("changed");
    this.setState({
      lng:parseFloat(snap.val())
    })
  })

  this.data.on('value',snap => {
    console.log("changed");
    this.setState({
      data:parseFloat(snap.val())
    })
  })

  this.dis.on('value',snap => {
    console.log("changed");
    this.setState({
      dis:parseFloat(snap.val())
    })
  })



}

  render() {
console.log("lat is",this.state.lat);
console.log("long is",this.state.lng);
console.log("speed",this.state.data);
console.log("diss",this.state.dis);
    return (
      <div  >
      <div class="split left">
      <div class="one">speed = {this.state.data}</div>
      <div class="one">Distance = {this.state.dis}</div>
      <div class="one">lat:  = {this.state.lat}</div>
      <div class="one">Long: = {this.state.lng}</div>
      <div></div>
      </div >
      <div class="split right">
      <Map google={this.props.google}
      initialCenter={{
          lat: this.state.lat,
          lng: this.state.lng
      }} 
      
      center={{
        lat: this.state.lat,
        lng: this.state.lng
      }}
      zoom={15}

      >

            <Marker
    title={'Speed ='+this.state.data}
    name={'SOMA'}
    position={{lat: this.state.lat, lng: this.state.lng}} />
 


      {/* <InfoWindow onClose={this.onInfoWindowClose}> */}
          {/* <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div> */}
      {/* </InfoWindow> */}
     
    </Map>

</div>
</div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: ("AIzaSyDYjMr9i9n9IT6-soZHWueLye9Su6vnuBs")
})(App)