import axios from "axios"
import React, { Component } from "react"
import "../styles/geostyles.css"



class GeoCachesCheckout extends React.Component {
    constructor(props){
        super()
        this.state = {
            
        }
    }

    handleCheckout(value){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
          }
    
          const form = {
            //insert current user id here
            coordinates: [this.state.newLat, this.state.newLng],
            // mysteryFlag: this.state.mysteryFlag,
            description: this.state.description,
            timeLimit: this.state.timeLimit,
            gifter: localStorage.getItem('currentUser')
          }

        axios.post(`http://localhost:8000/my-app/api/newGeoCache`, form, config ).then(res => {
            axios.post('http://localhost:8000/my-app/api/user/seeking/' + localStorage.getItem('username'),
                res.data, config).then(result => console.log(result.data)
            )
        })
    }

    render(){
        const geoCaches = this.props.geoCaches
        let counter = 0;
        return (
            <div>
                <table className="geo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Coordinates</th>
                            <th>Description</th>
                            <th>Gifter</th>
                            <th>Reviewer</th>
                            <th>Finder</th>
                            <th>Found</th>
                            <th>TimeLimit</th>
                            <th>Checkout</th>
                        </tr>
                    </thead>
                    <tbody>    
                    {
                        geoCaches ? 
                        geoCaches.map( gc => { 
                            return(
                                <tr className="geo-row">
                                    <td>{gc.id.timestamp.toString(16)}</td>
                                    <td>| {gc.location.coordinates[0]}, {gc.location.coordinates[1]}  </td>
                                    <td>| {gc.description}  </td>
                                    <td>| {gc.gifter}  </td>
                                    <td>| {gc.reviewer? gc.reviewer: "null"}  </td>
                                    <td>| {gc.finder}  </td>
                                    <td>| {gc.found}  </td>
                                    <td>| {gc.timeLimit}</td>
                                    <button className="checkout-geo" onClick={this.handleCheckout(counter)} value={counter++}>Checkout</button>
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

export default GeoCachesCheckout