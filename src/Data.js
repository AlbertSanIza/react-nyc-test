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
        })
    }
    render() {
        return null
    }
}

export default Data
