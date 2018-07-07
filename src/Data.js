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
                    if(ethnicityIndex == j) {
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
        var arrayData = data.slice()
        for(var i = 0; i < arrayData.length; i++) {
            var smallArray = []
            for (var j = 0; j < this.props.filter.length; j++) {
                if(data[0].indexOf(this.props.filter[j]) !== -1) {
                    smallArray.push(arrayData[i][data[0].indexOf(this.props.filter[j])].toUpperCase())
                }
            }
            arrayData[i] = smallArray
        }
        if(arrayData[0].length > 0) {
            for(var a = 0; a < arrayData[0].length; a++) {
                filters.push([arrayData[0][a], "ALL"])
            }
            for(var b = 1; b < data.length; b++) {
                for(var c = 0; c < arrayData[b].length; c++) {
                    var found = false
                    for(var d = 0; d < filters[c].length; d++) {
                        if(filters[c][d] === arrayData[b][c]) {
                            found = true
                            break
                        }
                    }
                    if(!found) {
                        filters[c].push(arrayData[b][c])
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
