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
    updateChart = memoize(data => {
        if(data) {
            this.setState({data: data})
        }
    })
    componentDidMount() {
        this.updateChart(this.props.data)
    }
    componentDidUpdate() {
        this.updateChart(this.props.data)
    }
    render() {
        return(
            <Bar data={this.state.data} options={this.state.options} width={this.props.width} height={this.props.height}/>
        )
    }
}

export default Chart
