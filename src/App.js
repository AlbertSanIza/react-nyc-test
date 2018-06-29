import React, { Component } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import './App.css'

class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                labels: ["", "", "", "", "", "", "", "", "", ""],
                datasets: [{
                    label: 'Top 10',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderWidth: 2
                }]
            }
        }
    }
    render() {
        return(
            <Bar data={this.state.data} width={400} height={150}/>
        )
    }
}

class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "ALL"
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }
    handleFilterChange(evt) {
        this.setState({value: evt.target.value})
        if (typeof this.props.onFilterChange === "function") {
            this.props.onFilterChange({title: this.props.title, value: evt.target.value})
        }
    }
    render() {
        return(
            <div className="col-sm-4 form-group">
            <label>{this.props.title}:</label>
            <select className="form-control" value={this.state.value} onChange={this.handleFilterChange}>
            {this.props.options.map((y, z) => <option key={z} value={y}>{y}</option>)}
            </select>
            </div>
        )
    }
}

class FiltersApplied extends Component {
    render() {
        if(this.props.list.length > 0) {
            return(
                <div className="row pt-4">
                <div className="col-md-12">
                <h5>
                Filters Applied:
                {this.props.list.map((y, z) => <span className="badge badge-secondary" key={z}>{y.title} - {y.value}</span>)}
                </h5>
                </div>
                </div>
            )
        }
        return ""
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            serverData: [],
            filterOptions: [],
            filtersAppliedList: []
        }
        this.getServerData()
        this.updateFiltersAppliedList = this.updateFiltersAppliedList.bind(this)
    }
    getServerData() {
        axios.get('mock-data.json').then(response => {
            var responseData = response.data.data
            for(var i = 0; i < responseData.length; i++) {
                responseData[i] = [
                    responseData[i][8], responseData[i][9], responseData[i][10], responseData[i][11]
                ]
                switch (responseData[i][2]) {
                    case "WHITE NON HISP":
                    responseData[i][2] = "WHITE NON HISPANIC"
                    break
                    case "BLACK NON HISP":
                    responseData[i][2] = "BLACK NON HISPANIC"
                    break
                    case "ASIAN AND PACI":
                    responseData[i][2] = "ASIAN AND PACIFIC ISLANDER"
                    break
                    default: break
                }
            }
            this.setState({loading: false, serverData: responseData, filterOptions: this.getFilterOptions(responseData)})
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
    updateFiltersAppliedList(data) {
        var filtersAppliedListCopy = this.state.filtersAppliedList.filter(z => z.title != data.title)
        if(data.value !== "ALL") {
            filtersAppliedListCopy.push(data)
        }
        this.setState({filtersAppliedList: filtersAppliedListCopy})
    }
    render() {
        if(!this.state.loading) {
            return(
                <div>
                <div className="row pt-3">
                <div className="col-md-12">
                <Chart/>
                </div>
                </div>
                <div className="row pt-3">
                <Filter title="Year" options={this.state.filterOptions[0]} onFilterChange={this.updateFiltersAppliedList}/>
                <Filter title="Gender" options={this.state.filterOptions[1]} onFilterChange={this.updateFiltersAppliedList}/>
                <Filter title="Ethnicity" options={this.state.filterOptions[2]} onFilterChange={this.updateFiltersAppliedList}/>
                </div>
                <FiltersApplied list={this.state.filtersAppliedList}/>
                </div>
            )
        }
        return "Loading..."
    }
}

export default App
