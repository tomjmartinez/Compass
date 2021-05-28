import axios from "axios"
import React, { Component } from "react"
import "../styles/geostyles.css"
import GeoCachesTable from "./GeoCachesTable"
import MyMapComponent from "./MyMapComponent"

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
                console.log(response.data)
            })
            .catch()
    }

    render(){
        console.log(this.state)
        const {myGeoCaches} = this.state
        return (
            <div>
                <h2 className={"homeItem"}>My GeoCaches</h2>
                <MyMapComponent geoCaches={myGeoCaches} />
            </div>
        )
    }
}

export default MyGeoCaches