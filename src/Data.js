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
            var responseData = response.data.data.slice()
            responseData.unshift(columnName)
            for(var i = 0; i < responseData.length; i++) {
                var smallArray = []
                for (var j = 0; j < this.props.list.length; j++) {
                    smallArray.push(responseData[i][columnName.indexOf(this.props.list[j])].toUpperCase())
                }
                responseData[i] = smallArray
                switch(responseData[i][2]) {
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
            this.props.onDataChange(responseData)
            this.getFilterOptions(responseData)
        })
    }
    getFilterOptions = data => {
        var filters = []
        if(data[0].length > 0) {
            for(var a = 0; a < data[0].length; a++) {
                filters.push([data[0][a], "ALL"])
            }
            for(var i = 1; i < data.length; i++) {
                for(var j = 0; j < data[i].length; j++) {
                    var found = false
                    for(var k = 0; k < filters[j].length; k++) {
                        if(filters[j][k] === data[i][j]) {
                            found = true
                            break
                        }
                    }
                    if(!found) {
                        filters[j].push(data[i][j])
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
