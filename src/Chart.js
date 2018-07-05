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
                tooltips: {
                    displayColors: false
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "#0a291f"
                        },
                        ticks: {
                            fontColor: "#FFF8F0"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "#0a291f"
                        },
                        ticks: {
                            fontColor: "#FFF8F0",
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    }
    componentDidMount = () => {
        this.updateChart(this.props.data, this.props.filter, this.props.main)
    }
    componentDidUpdate = () => {
        this.updateChart(this.props.data, this.props.filter, this.props.main)
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
        this.setState({
            data: canvas => {
                const ctx = canvas.getContext("2d")
                const gradient = ctx.createLinearGradient(0, 0, 0, 250)
                gradient.addColorStop(0, "rgba(19, 83, 63, 0.5)")
                gradient.addColorStop(1, "#30CD9B")
                return {
                    labels: labels,
                    datasets: [{
                        data: dataset,
                        borderWidth: 3,
                        hoverBorderWidth: 2,
                        backgroundColor: gradient,
                        hoverBackgroundColor: gradient,
                        hoverBorderColor: '#FFF8F0'
                    }]
                }
            }
        })
    })
    render() {
        return(
            <Bar data={this.state.data} options={this.state.options} width={this.props.width} height={this.props.height}/>
        )
    }
}

export default Chart
