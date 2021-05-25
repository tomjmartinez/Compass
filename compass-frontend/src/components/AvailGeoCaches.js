import axios from "axios"
import React, { Component } from "react"
import GeoCachesTable from "./GeoCachesTable"
import "../styles/geostyles.css"

//const MyGeoCaches = () => {}

class AvailGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            availGeoCaches : []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/my-app/api/avail-geocaches")
            .then(response =>{
                this.setState({availGeoCaches: response.data})
            })
            .catch()
    }

    render(){
        const {availGeoCaches} = this.state
        return (
            <GeoCachesTable geoCaches={availGeoCaches} />
        )
    }
}

export default AvailGeoCaches