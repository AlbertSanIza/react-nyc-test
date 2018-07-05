import React, { Component } from 'react'

class FilterList extends Component {
    render() {
        if(this.props.data && this.props.data.length > 0) {
            return(
                <div className="row pt-4 fade-in">
                <div className="col-md-12">
                <h5>
                Filters Applied:
                {this.props.data.map((y, z) => <span className="badge badge-secondary fade-in" key={z}>{y.title} - {y.value}</span>)}
                </h5>
                </div>
                </div>
            )
        }
        return null
    }
}

export default FilterList
