import React from 'react';

class ErrorBlock extends React.Component {

    render() {

        return (
            <div style={{margin:"0 12px 12px 12px"}} role="alert"
                className={`alert alert-danger text-center ${this.props.show ? "" : "visually-hidden"}`} 
            >
            {this.props.message ? this.props.message : "Unknown Error"}
          </div>
        );
    }
}

export default ErrorBlock;