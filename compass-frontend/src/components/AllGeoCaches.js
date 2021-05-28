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
            geoids : [],
            test: []
        }
    }

    handleNextPath(path){

        this.props.history.push(path);
    }

    componentDidMount(){
        axios.get("http://localhost:8000/my-app/api/all-geocaches")
            .then(response =>{
                this.setState({allGeoCaches: response.data.geocaches})
                this.setState({geoids: response.data.geoids})
                for(let i = 0; i < this.state.allGeoCaches.length; i++){
                    this.setState(previousState => {
                        return {
                          test: [
                            ...previousState.test,
                            {
                                cache: previousState.allGeoCaches[i],
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
                <h4>Viewing All Geo Caches</h4>
                <button onClick={()=>this.handleNextPath("/home")}>Go Back Home</button>
                <p>Select marker then hit checkout to select which marker to find</p>
                <MapComponent geoCaches={testing} />
                {/* <GeoCachesCheckout geoCaches={allGeoCaches} geoids={this.state.geoids}/> */}
            </div>
        )
    }
}

export default AllGeoCaches