import React, { Component } from 'react'
import memoize from 'memoize-one';
import { Bar } from 'react-chartjs-2'

class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                labels: [],
                datasets: []
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    }
    updateChart = memoize((data, filter, main) => {
        var array = data.slice()
        var headers = array.shift()
        filter.forEach(x => {
            array = array.filter(z => z[headers.indexOf(x.title)] === x.value)
        })
        array = array.reduce((y, z) => z[headers.indexOf(main)] in y ? (y[z[headers.indexOf(main)]]++, y) : (y[z[headers.indexOf(main)]] = 1, y), {})
        var sortable = []
        for(var name in array) {
            sortable.push([name, array[name]])
        }
        var labels = []
        var dataset = []
        if(sortable.length > 0) {
            sortable.sort((y, z) => z[1] - y[1])
            for(var i = 0; i < (sortable.length > 10 ? 10 : sortable.length); i++) {
                labels.push(sortable[i][0])
                dataset.push(sortable[i][1])
            }
        }
        this.setState({data: {
            labels: labels,
            datasets: [{
                data: dataset,
                borderWidth: 3,
                backgroundColor: [
                    'rgba(0, 255, 153, 0.5)',
                    'rgba(28, 255, 153, 0.5)',
                    'rgba(56, 255, 153, 0.5)',
                    'rgba(85, 255, 153, 0.5)',
                    'rgba(113, 255, 153, 0.5)',
                    'rgba(141, 255, 153, 0.5)',
                    'rgba(170, 255, 153, 0.5)',
                    'rgba(198, 255, 153, 0.5)',
                    'rgba(226, 255, 153, 0.5)',
                    'rgba(255, 255, 153, 0.5)'
                ]
            }]
        }})
    })
    componentDidMount() {
        this.updateChart(this.props.data, this.props.filter, this.props.main)
    }
    componentDidUpdate() {
        this.updateChart(this.props.data, this.props.filter, this.props.main)
    }
    render() {
        return(
            <Bar data={this.state.data} options={this.state.options} width={this.props.width} height={this.props.height}/>
        )
    }
}

export default Chart
