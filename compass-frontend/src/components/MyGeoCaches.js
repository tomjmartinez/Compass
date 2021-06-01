import axios from "axios"
import React, { Component } from "react"
import "../styles/geostyles.css"
import GeoCachesTable from "./GeoCachesTable"
import MapComponent from "./MapComponent"

//const MyGeoCaches = () => {}

class MyGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            myGeoCaches : [],
            test: []
        }
    }

    handleNextPath(path){

        this.props.history.push(path);
    }

    componentDidMount(){

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
          }

        axios.get("http://localhost:8000/my-app/api/my-geocaches/" + localStorage.getItem("currentUser"), config)
            .then(response =>{
                console.log(response.data);
                this.setState({myGeoCaches: response.data})
                for(let i = 0; i < this.state.myGeoCaches.length; i++){
                    this.setState(previousState => {
                        return {
                          test: [
                            ...previousState.test,
                            {
                                cache: previousState.myGeoCaches[i],
                            }
                          ]
                        };
                      });
                }
            })
            .catch()
    }

    render(){

        const caches = {caches: this.state.test}
        return (
            <div>
                <h2 className={"homeItem"}>My GeoCaches</h2>
                <button onClick={()=>this.handleNextPath("/home")}>Go Back Home</button>
                <MapComponent geoCaches={caches} />
            </div>
        )
    }
}

export default MyGeoCaches