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
            allGeoCaches : [],
            geoids : []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/my-app/api/all-geocaches")
            .then(response =>{
                this.setState({allGeoCaches: response.data.geocaches})
                this.setState({geoids: response.data.geoids})
            })
            .catch()
    }

    render(){
        const {allGeoCaches} = this.state;
        return (
            <div>
                {/*<MapComponent geoCaches={this.state.allGeoCaches} />*/}
                <GeoCachesCheckout geoCaches={allGeoCaches} geoids={this.state.geoids}/>
            </div>
        )
    }
}

export default AllGeoCaches