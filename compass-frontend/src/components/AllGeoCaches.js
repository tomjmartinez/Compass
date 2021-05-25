import axios from "axios"
import React, { Component } from "react"
import "../styles/geostyles.css"

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
                this.setState({allGeoCaches: response.data})
            })
            .catch()
    }

    render(){
        const {allGeoCaches} = this.state
        return (
            <div>
                <h2>All GeoCaches</h2>
                <table className="geo-table">
                    <thead>
                        <tr>
                            <th>Coordinates</th>
                            <th>Description</th>
                            <th>Gifter</th>
                            <th>Reviewer</th>
                            <th>Finder</th>
                            <th>Found</th>
                            <th>TimeLimit</th>
                        </tr>
                    </thead>
                    <tbody>    
                    {
                        allGeoCaches ? 
                        allGeoCaches.map( gc => { 
                            return(
                                <tr className="geo-row">
                                    <td> {gc.coordinates[0]}, {gc.coordinates[1]}  </td>
                                    <td>| {gc.description}  </td>
                                    <td>| {gc.gifter}  </td>
                                    <td>| {gc.reviewer? gc.reviewer: "null"}  </td>
                                    <td>| {gc.finder}  </td>
                                    <td>| {gc.found.toString()}  </td>
                                    <td>| {gc.timeLimit}</td>
                                </tr>
                            )
                        } ) :
                        "No GeoCaches to Show"
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AllGeoCaches