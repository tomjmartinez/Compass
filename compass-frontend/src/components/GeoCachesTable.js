import axios from "axios"
import React, { Component } from "react"
import "../styles/geostyles.css"



function GeoCachesTable(props) {
    

    const geoCaches = props.geoCaches
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

export default GeoCachesTable