import React, { Component } from 'react'
import axios from 'axios'
import { PropagateLoader } from 'react-spinners'
import Chart from './Chart.js'
import Filter from './Filter.js'
import FilterList from './FilterList.js'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            serverData: [],
            filteredData: {
                labels: [],
                datasets: []
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
        this.setState({filterAppliedList: filterAppliedListCopy, filteredData: this.updateFilteredData(this.state.serverData, filterAppliedListCopy)})
    }
    updateFilteredData(data, filters) {
        var filteredArray = data.slice()
        var headers = filteredArray[0]
        filteredArray.shift()
        filters.forEach(x => {
            filteredArray = filteredArray.filter(z => {
                return z[headers.indexOf(x.title)] === x.value
            })
        })
        filteredArray = filteredArray.reduce((y, z) => z[3] in y ? (y[z[3]]++, y) : (y[z[3]] = 1, y), {})
        var sortable = []
        for(var name in filteredArray) {
            sortable.push([name, filteredArray[name]])
        }
        var labels = []
        var datasetData = []
        if(sortable.length > 0) {
            sortable.sort((y, z) => z[1] - y[1])
            for(var i = 0; i < 10; i++) {
                labels.push(sortable[i][0])
                datasetData.push(sortable[i][1])
            }
        }
        return {
            labels: labels,
            datasets: [{
                data: datasetData
            }]
        }
    }
    render() {
        if(!this.state.loading) {
            return(
                <div>
                <div className="row pt-3">
                <div className="col-md-12">
                <Chart data={this.state.filteredData} width={400} heigth={150}/>
                </div>
                </div>
                <div className="row pt-3">
                {this.state.filterOptions.map((y, z) => {
                    switch (y[0]) {
                        case "CHILD'S FIRST NAME":
                        return ""
                        default:
                        return <Filter key={z} options={y} onFilterChange={this.updatefilterAppliedList}/>
                    }
                })}
                </div>
                <FilterList data={this.state.filterAppliedList}/>
                </div>
            )
        }
        return(
            <div className="row pt-3">
            <div className="col-md-12 loading-container">
            <div>
            <PropagateLoader color={'#00ccff'} size={26}/>
            </div>
            </div>
            </div>
        )
    }
}

export default App
