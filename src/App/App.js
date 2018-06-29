import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
class App extends Component {
    constructor() {
        super()
        this.state = {
            serverData: []
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        axios.get('mock-data.json').then(response => {
            var responseData = response.data.data
            for (var i = 0; i < responseData.length; i++) {
                responseData[i] = [responseData[i][8], responseData[i][9], responseData[i][10]]
            }
        })
    }
    render() {
        return (
            <div>
            <button className='button' onClick={this.handleClick}>Click Me</button>
            </div>
        )
    }
}
export default App
