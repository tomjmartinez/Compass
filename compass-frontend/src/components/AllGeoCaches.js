import axios from "axios"
import React, { Component } from "react"
import GeoCachesTable from "./GeoCachesTable"
import GeoCachesCheckout from "./GeoCachesCheckout"
import "../styles/geostyles.css"
import MapComponent from "./MapComponent"

//const MyGeoCaches = () => {}

class AllGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            allGeoCaches : []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/my-app/api/all-geocaches")
            .then(response =>{
                console.log(response.data)
                this.setState({allGeoCaches: response.data})
            })
            .catch()
    }

    render(){
        const {allGeoCaches} = this.state;

        return (
            <div>
                <GeoCachesCheckout geoCaches={allGeoCaches} />
                <MapComponent geoCaches={this.state.allGeoCaches} />
            </div>
        )
    }
}

export default AllGeoCaches