import axios from "axios"
import React, { Component } from "react"

//const MyGeoCaches = () => {}

class MyGeoCaches extends Component{
    constructor(){
        super()
        this.state = {
            myGeoCaches : []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/my-app/api/my-geocaches")
            .then(response =>{
                console.log(response);
                this.setState({myGeoCaches: response.data})
            })
            .catch()
    }

    render(){
        const {myGeoCaches} = this.state
        console.log(myGeoCaches)
        return (
            <div>
                <h2>My GeoCaches</h2>
                <table>
                    <th>
                        <tr>
                            <td>location</td>
                            <td>Seeker</td>
                        </tr>
                    </th>
                    <tb>
                    {
                        myGeoCaches ? 
                        myGeoCaches.map( gc => {
                            <tr>
                                <td>{gc.coordinates}</td>
                                <td>{gc.seeker}</td>
                            </tr>
                        } ) :
                        "No GeoCaches to Show"
                    }
                    </tb>
                </table>
            </div>
        )
    }
}

export default MyGeoCaches