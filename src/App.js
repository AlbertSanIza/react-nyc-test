import React, { Component } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import './App.css'

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
            <label>{this.props.options[0] ? this.props.options[0] : "Title"}:</label>
            <select className="form-control" value={this.state.value} onChange={this.handleFilterChange} disabled={this.props.options ? (this.props.options.length < 1) : true}>
            {this.props.options ? (this.props.options.map((y, z) => z > 0 ? <option key={z} value={y}>{y}</option> : "")) : false}
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
            filteredData: {
                labels: ["", "", "", "", "", "", "", "", "", ""],
                datasets: [{
                    label: 'Top 10',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderWidth: 2
                }]
            },
            filterOptions: [],
            filterAppliedList: []
        }
        this.getServerData()
        this.updatefilterAppliedList = this.updatefilterAppliedList.bind(this)
    }
    getServerData() {
        axios.get('mock-data.json').then(response => {
            var columnName = []
            response.data.meta.view.columns.forEach(z => {
                columnName.push(z.name.toUpperCase())
            })
            var responseData = response.data.data
            responseData.unshift(columnName)
            for(var i = 0; i < responseData.length; i++) {
                responseData[i] = [
                    responseData[i][8], responseData[i][9], responseData[i][10], responseData[i][11].toUpperCase()
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
            this.setState({loading: false, serverData: responseData, filteredData: this.updateFilteredData(responseData, this.state.filterAppliedList), filterOptions: this.getFilterOptions(responseData)})
        })
    }
    getFilterOptions(data) {
        var filters = []
        if(data[0].length > 0) {
            for(var a = 0; a < data[0].length; a++) {
                filters.push([data[0][a], "ALL"])
            }
            for(var i = 1; i < data.length; i++) {
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
    updatefilterAppliedList(data) {
        var filterAppliedListCopy = this.state.filterAppliedList.filter(z => z.title !== data.title)
        if(data.value !== "ALL") {
            filterAppliedListCopy.push(data)
        }
        this.setState({filterAppliedList: filterAppliedListCopy})
    }
    updateFilteredData(data, filters) {
        var nameCount = data.reduce((y, z) => z[3] in y ? (y[z[3]]++, y) : (y[z[3]] = 1, y), {})
        var sortable = []
        for(var name in nameCount) {
            sortable.push([name, nameCount[name]])
        }
        sortable.sort((y, z) => z[1] - y[1])
        var labels = []
        var datasetData = []
        for(var i = 0; i < 10; i++) {
            labels.push(sortable[i][0])
            datasetData.push(sortable[i][1])
        }
        return {
            labels: labels,
            datasets: [{
                label: 'Top 10',
                data: datasetData,
                borderWidth: 2
            }]
        }
    }
    render() {
        if(!this.state.loading) {
            return(
                <div>
                <div className="row pt-3">
                <div className="col-md-12">
                <Bar data={this.state.filteredData} width={400} height={150}/>
                </div>
                </div>
                <div className="row pt-3">
                <Filter title="Year" options={this.state.filterOptions[0]} onFilterChange={this.updatefilterAppliedList}/>
                <Filter title="Gender" options={this.state.filterOptions[1]} onFilterChange={this.updatefilterAppliedList}/>
                <Filter title="Ethnicity" options={this.state.filterOptions[2]} onFilterChange={this.updatefilterAppliedList}/>
                </div>
                <FiltersApplied list={this.state.filterAppliedList}/>
                </div>
            )
        }
        return "Loading..."
    }
}

export default App
