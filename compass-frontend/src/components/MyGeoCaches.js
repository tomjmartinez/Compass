import axios from "axios"
import React, { Component } from "react"
import "../styles/geostyles.css"
import GeoCachesTable from "./GeoCachesTable"

//const MyGeoCaches = () => {}

class MyGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            myGeoCaches : []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/my-app/api/my-geocaches/" + localStorage.getItem("currentUser"))
            .then(response =>{
                this.setState({myGeoCaches: response.data})
            })
            .catch()
    }

    render(){
        const {myGeoCaches} = this.state
        return (
            <GeoCachesTable geoCaches={myGeoCaches} />
        )
    }
}

export default MyGeoCaches