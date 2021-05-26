import axios from "axios"
import React, { Component } from "react"
import GeoCachesTable from "./GeoCachesTable"
import "../styles/geostyles.css"

//const MyGeoCaches = () => {}

class NearGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            nearGeoCaches : [],
            mylongitude: -80.2,
            mylatitude: -60.1
        }
    }

    componentDidMount(){
        axios.post("http://localhost:8000/my-app/api/near-geocaches",
            {
                lon: this.state.mylongitude,
                lat: this.state.mylatitude
            },
            {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
                }
            })
            .then(response =>{
                console.log(response.data)
                this.setState({nearGeoCaches: response.data})
                
            })
            .catch()
    }

    render(){
        const {nearGeoCaches} = this.state
        return (
            <GeoCachesTable geoCaches={nearGeoCaches} />
        )
    }
}

export default NearGeoCaches