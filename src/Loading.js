import React, { Component } from 'react'
import { PropagateLoader } from 'react-spinners'

class Loading extends Component {
    render() {
        return(
            <div className="row pt-3">
            <div className="col-md-12 loading-container">
            <div>
            <PropagateLoader color={'#00ccff'} size={26}/>
            </div>
            </div>
            </div>
        )
    }
}

export default Loading
