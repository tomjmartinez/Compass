import axios from "axios"
import React, { Component } from "react"
import "../styles/geostyles.css"

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
            <div>
                <h2>My GeoCaches</h2>
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
                        myGeoCaches ? 
                        myGeoCaches.map( gc => { 
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

export default MyGeoCaches