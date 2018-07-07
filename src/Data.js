import { Component } from 'react'
import axios from 'axios'

class Data extends Component {
    constructor(props) {
        super(props)
        this.getData()
    }
    getData = () => {
        axios.get('https://data.cityofnewyork.us/api/views/25th-nujf/rows.json').then(response => {
            var columnName = []
            response.data.meta.view.columns.forEach(z => {
                columnName.push(z.name.toUpperCase())
            })
            response.data.data.unshift(columnName)
            var ethnicityIndex = columnName.indexOf("ETHNICITY")
            for (var i = 0; i < response.data.data.length; i++) {
                for (var j = 0; j < response.data.data[i].length; j++) {
                    if(typeof response.data.data[i][j] === "string") {
                        response.data.data[i][j] = response.data.data[i][j].toUpperCase()
                    }
                    if(ethnicityIndex === j) {
                        switch(response.data.data[i][j]) {
                            case "WHITE NON HISP":
                            response.data.data[i][j] = "WHITE NON HISPANIC"
                            break
                            case "BLACK NON HISP":
                            response.data.data[i][j] = "BLACK NON HISPANIC"
                            break
                            case "ASIAN AND PACI":
                            response.data.data[i][j] = "ASIAN AND PACIFIC ISLANDER"
                            break
                            default: break
                        }
                    }
                }
            }
            this.props.onDataChange(response.data.data)
            this.getFilterOptions(response.data.data)
        })
    }
    getFilterOptions = data => {
        var filters = []
        for(var i = 0; i < this.props.filter.length; i++) {
            var index = data[0].indexOf(this.props.filter[i])
            if(index > -1) {
                filters.push([this.props.filter[i], "ALL"])
                for(var j = 0; j < data.length; j++) {
                    if(!filters[i].includes(data[j][index])) {
                        filters[i].push(data[j][index])
                    }
                }
            }
        }
        this.props.onFilterOptionChange(filters)
    }
    render() {
        return null
    }
}

export default Data
