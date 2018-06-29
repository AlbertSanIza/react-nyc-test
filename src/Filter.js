import React, { Component } from 'react'

class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "ALL"
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }
    handleFilterChange(evt) {
        this.setState({value: evt.target.value})
        if (typeof this.props.onFilterChange === "function") {
            this.props.onFilterChange({title: this.props.options[0], value: evt.target.value})
        }
    }
    render() {
        return(
            <div className="col-sm-4 form-group">
            <label>{this.props.options[0] ? this.props.options[0] : "Title"}:</label>
            <select className="form-control" value={this.state.value} onChange={this.handleFilterChange} disabled={this.props.options ? (this.props.options.length < 1) : true}>
            {this.props.options ? (this.props.options.map((y, z) => z > 0 ? <option key={z} value={y}>{y}</option> : "")) : false}
            </select>
            </div>
        )
    }
}

export default Filter
