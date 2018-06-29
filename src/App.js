import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class Filter extends Component {
    render() {
        return (
            <div className="col-sm-4 form-group">
            <label>{this.props.title}:</label>
            <select className="form-control">
            <option>All</option>
            <option>1</option>
            <option>2</option>
            </select>
            </div>
        )
    }
}

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
            this.setState({serverData: responseData})
        })
    }
    render() {
        return (
            <div>
            <div className="row pt-3">
            <Filter title="Year"/>
            <Filter title="Gender"/>
            <Filter title="Ethnicity"/>
            </div>
            <button className='button' onClick={this.handleClick}>Click Me</button>
            </div>
        )
    }
}
export default App
