import axios from "axios"
import React, { Component } from "react"
import GeoCachesTable from "./GeoCachesTable"
import GeoCachesCheckout from "./GeoCachesCheckout"
import "../styles/geostyles.css"
import MapComponent from "./MapComponent"

//const MyGeoCaches = () => {}

class NearGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            nearGeoCaches : [],
            geoids : [],
            test: []
        }
    }

    handleCheckout(event){
        console.log(event.target.value)
        event.preventDefault();
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
          }
    
          const checkout = {
            checkingOut: event.target.value,
            currentUser: localStorage.getItem("currentUser")
          }

        axios.post(`http://localhost:8000/my-app/api/checkout-geocache`, checkout, config )
            .then(res => {
                console.log(res.data)
                if(res.data){
                    axios.post('http://localhost:8000/my-app/api/user/seeking/' + localStorage.getItem('username'),
                    checkout.checkingOut, config).then(result => localStorage.setItem('seeking', result.data.seeking)
                )
                }
            })
    }

    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            axios.get("http://localhost:8000/my-app/api/all-geocaches")
            .then(response =>{
                this.setState({nearGeoCaches: response.data.geocaches})
                this.setState({geoids: response.data.geoids})
                for(let i = 0; i < this.state.nearGeoCaches.length || i < 5; i++){
                    this.setState(previousState => {
                        return {
                          test: [
                            ...previousState.test,
                            {
                                cache: previousState.nearGeoCaches[i],
                                id: previousState.geoids[i]
                            }
                          ]
                        };
                      });
                }
            })
            .catch()
        })}
    }

    render(){
        const testing = {caches: this.state.test, handleCheckout: this.handleCheckout}
        return (
            <div>
                <p>Select marker then hit checkout to select which marker to find</p>
                <MapComponent geoCaches={testing} />
            </div>
        )
    }
}

export default NearGeoCaches