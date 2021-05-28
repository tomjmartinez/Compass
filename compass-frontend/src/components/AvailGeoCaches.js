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

                if(res.data){
                    axios.post('http://localhost:8000/my-app/api/user/seeking/' + localStorage.getItem('username'),
                    checkout.checkingOut, config).then(result => localStorage.setItem('seeking', result.data.seeking)
                )
                }
            })
    }

    handleNextPath(path){
        this.props.history.push(path);
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
                <h4>Viewing All Available Geo Caches</h4>
                <button onClick={()=>this.handleNextPath("/home")}>Go Back Home</button>
                <MapComponent geoCaches={testing} />
                {/*<GeoCachesCheckout geoCaches={availGeoCaches} geoids={this.state.geoids/>*/}
            </div>
        )
    }
}

export default AvailGeoCaches