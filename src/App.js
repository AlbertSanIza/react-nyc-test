import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "ALL"
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    handleSelectChange(evt) {
        this.setState({value: evt.target.value})
    }
    render() {
        return(
            <div className="col-sm-4 form-group">
            <label>{this.props.title}:</label>
            <select className="form-control" value={this.state.value} onChange={this.handleSelectChange}>
            <option value="ALL">ALL</option>
            </select>
            </div>
        )
    }
}

class FiltersApplied extends Component {
    render() {
        return(
            <div className="row pt-4">
            <div className="col-md-12">
            <h5>
            Filters Applied:
            <span className="badge badge-secondary">Year - </span>
            <span className="badge badge-secondary">Gender - </span>
            <span className="badge badge-secondary">Ethnicity - </span>
            </h5>
            </div>
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
        this.getServerData()
    }
    getServerData() {
        axios.get('mock-data.json').then(response => {
            var responseData = response.data.data
            for(var i = 0; i < responseData.length; i++) {
                responseData[i] = [responseData[i][8], responseData[i][9], responseData[i][10]]
            }
            this.setState({loaded: true, serverData: responseData, filterOptions: this.getFilterOptions(responseData)})
        })
    }
    getFilterOptions(data) {
        var filters = []
        if(data[0].length > 0) {
            for(var a = 0; a < data[0].length; a++) {
                filters.push(["ALL"])
            }
            for(var i = 0; i < data.length; i++) {
                for(var j = 0; j < data[i].length; j++) {
                    var found = false
                    for (var k = 0; k < filters[j].length; k++) {
                        if (filters[j][k] === data[i][j]) {
                            found = true
                            break
                        }
                    }
                    if (!found) {
                        filters[j].push(data[i][j])
                    }
                }
            }
        }
        return filters
    }
    render() {
        if(this.state.loaded) {
            return(
                <div>
                <div className="row pt-3">
                <Filter title="Year" options={this.yearFilter}/>
                <Filter title="Gender" options={this.yearFilter}/>
                <Filter title="Ethnicity" options={this.yearFilter}/>
                </div>
                <FiltersApplied/>
                </div>
            )
        }
        return "Loading..."
    }
}

export default App
