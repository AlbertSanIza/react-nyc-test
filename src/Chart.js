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
    updateChart = memoize((labels, datasets) => {
        if (labels && datasets) {
            this.setState({data: {
                labels: labels,
                datasets: datasets
            }})
        }
    })
    render() {
        this.updateChart(this.props.labels, this.props.datasets)
        return(
            <Bar data={this.state.data} options={this.state.options} width={this.props.width} height={this.props.height}/>
        )
    }
}

export default Chart
