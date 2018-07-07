import React, { Component } from 'react'

import Data from './Data.js'
import Chart from './Chart.js'
import Filter from './Filter.js'
import FilterList from './FilterList.js'
import Loading from './Loading.js'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnFilter: ["YEAR OF BIRTH", "GENDER", "ETHNICITY"],
            columnMain: "CHILD'S FIRST NAME",
            data: [],
            filterOption: [],
            filterList: []
        }
        this.handleDataChange = this.handleDataChange.bind(this)
        this.handleFilterOptionChange = this.handleFilterOptionChange.bind(this)
        this.handleFilterListChange = this.handleFilterListChange.bind(this)
    }
    handleDataChange = data => {
        this.setState({data: data})
    }
    handleFilterOptionChange = data => {
        this.setState({filterOption: data})
    }
    handleFilterListChange = data => {
        var filterList = this.state.filterList.filter(z => z.title !== data.title)
        if(data.value !== "ALL") {
            filterList.push(data)
        }
        this.setState({filterList: filterList})
    }
    render() {
        return(
            <div>
            <Data filter={this.state.columnFilter} onDataChange={this.handleDataChange} onFilterOptionChange={this.handleFilterOptionChange}/>
            {(() => {
                if(this.state.data.length > 0) {
                    return(
                        <div className="fade-in">
                        <div className="row pt-4">
                        <div className="col-sm-12">
                        <h2>NYC Baby Names <small className="text-muted">by Albert Sanchez</small></h2>
                        </div>
                        </div>
                        <div className="row pt-3">
                        <div className="col-md-12">
                        <Chart data={this.state.data} filter={this.state.filterList} main={this.state.columnMain} width={500} heigth={150}/>
                        </div>
                        </div>
                        </div>
                    )
                }
                return <Loading/>
            })()}
            <div className="row pt-3">
            {this.state.filterOption.map((y, z) => <Filter key={z} options={y} onFilterChange={this.handleFilterListChange}/>)}
            </div>
            <FilterList data={this.state.filterList}/>
            </div>
        )
    }
}

export default App
