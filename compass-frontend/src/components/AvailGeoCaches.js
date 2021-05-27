import axios from "axios"
import React, { Component } from "react"
import GeoCachesTable from "./GeoCachesTable"
import "../styles/geostyles.css"
import MapComponent from "./MapComponent"

//const MyGeoCaches = () => {}

class AvailGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            availGeoCaches : [],
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
                    checkout.checkingOut, config).then(result => console.log(result.data)
                )
                }
            })
    }

    componentDidMount(){
        axios.get("http://localhost:8000/my-app/api/avail-geocaches")
            .then(response =>{
                this.setState({
                    availGeoCaches: response.data.geocaches,
                    geoids: response.data.geoids
                })
                for(let i = 0; i < this.state.availGeoCaches.length; i++){
                    this.setState(previousState => {
                        return {
                          test: [
                            ...previousState.test,
                            {
                                cache: previousState.availGeoCaches[i],
                                id: previousState.geoids[i]
                            }
                          ]
                        };
                      });
                }
            })
            .catch()
    }

    render(){
        const testing = {caches: this.state.test, handleCheckout: this.handleCheckout}
        return (
            <div>
                <MapComponent geoCaches={testing} />
                {/*<GeoCachesCheckout geoCaches={availGeoCaches} geoids={this.state.geoids/>*/}
            </div>
        )
    }
}

export default AvailGeoCaches