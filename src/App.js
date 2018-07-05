import React, { Component } from 'react'

import Data from './Data.js'
import Chart from './Chart.js'
import Filter from './Filter.js'
import FilterList from './FilterList.js'
import Loading from './Loading.js'

class App extends Component {
    constructor() {
        super()
        this.state = {
            columnList: ["YEAR OF BIRTH", "GENDER", "ETHNICITY", "CHILD'S FIRST NAME"],
            columnFilter: ["YEAR OF BIRTH", "GENDER", "ETHNICITY"],
            data: [],
            filterList: [],
            filteredData: {
                labels: [],
                datasets: []
            },
            filterOptions: []
        }
        this.handleFilterListChange = this.handleFilterListChange.bind(this)
    }
    handleDataChange = data => {
        this.setState({data: data, filteredData: this.updateFilteredData(data, this.state.filterList), filterOptions: this.getFilterOptions(data)})
    }
    handleFilterListChange = data => {
        var filterList = this.state.filterList.filter(z => z.title !== data.title)
        if(data.value !== "ALL") {
            filterList.push(data)
        }
        this.setState({filterList: filterList})
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
            for(var i = 0; i < (sortable.length > 10 ? 10 : sortable.length); i++) {
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
        return(
            <div>
            <Data onDataChange={this.handleDataChange}/>
            {(() => {
                if(this.state.data.length > 0) {
                    return(
                        <div className="fade-in">
                        <div className="row pt-4">
                        <div className="col-sm-12">
                        <h2>Top 10: NYC Baby Names <small className="text-muted">by Albert Sanchez</small></h2>
                        </div>
                        </div>
                        <div className="row pt-3">
                        <div className="col-md-12">
                        <Chart data={this.state.filteredData} width={500} heigth={150}/>
                        </div>
                        </div>
                        </div>
                    )
                }
                return <Loading/>
            })()}
            <div className="row pt-3">
            {this.state.filterOptions.map((y, z) => <Filter key={z} options={y} onFilterChange={this.handleFilterListChange}/>)}
            </div>
            <FilterList data={this.state.filterList}/>
            </div>
        )
    }
}

export default App
