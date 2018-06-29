import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class Filter extends Component {
    render() {
        return(
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
            loaded: false,
            serverData: []
        }
        this.handleClick = this.handleClick.bind(this)
    }
    loadServerData() {
        axios.get('mock-data.json').then(response => {
            var responseData = response.data.data
            for (var i = 0; i < responseData.length; i++) {
                responseData[i] = [responseData[i][8], responseData[i][9], responseData[i][10]]
            }
            this.setState({loaded: true, serverData: responseData})
        })
    }
    handleClick() {
        this.loadServerData()
    }
    render() {
        this.loadServerData()
        if(this.state.loaded) {
            return(
                <div>
                <div className="row pt-3">
                <Filter title="Year" options={this.yearFilter}/>
                <Filter title="Gender" options={this.yearFilter}/>
                <Filter title="Ethnicity" options={this.yearFilter}/>
                </div>
                <button className='button' onClick={this.handleClick}>Click Me</button>
                <div class="row pt-4">
                    <div class="col-md-12">
                        <h5>
                            Filters Applied:
                            <span class="badge badge-secondary">Year - </span>
                            <span class="badge badge-secondary">Gender - </span>
                            <span class="badge badge-secondary">Ethnicity - </span>
                        </h5>
                    </div>
                </div>
                </div>
            )
        }
        return "Loading..."
    }
}
export default App
