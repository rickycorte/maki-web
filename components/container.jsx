import React from 'react';
import styles from './layout.module.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
    }

    render() {
        return (
            <div className={styles.container}>{this.props.children}</div>
        )
    }
}

export default Container