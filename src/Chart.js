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
            data.datasets[0].backgroundColor = [
                'rgba(0, 255, 153, 0.25)',
                'rgba(28, 255, 153, 0.25)',
                'rgba(56, 255, 153, 0.25)',
                'rgba(85, 255, 153, 0.25)',
                'rgba(113, 255, 153, 0.25)',
                'rgba(141, 255, 153, 0.25)',
                'rgba(170, 255, 153, 0.25)',
                'rgba(198, 255, 153, 0.25)',
                'rgba(226, 255, 153, 0.25)',
                'rgba(255, 255, 153, 0.25)'
            ]
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
