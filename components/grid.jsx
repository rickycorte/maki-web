import React from 'react';
import styles from './layout.module.css';


class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
    }

    render() {
        return (
            <div className={styles.grid}>{this.props.children}</div>
        )
    }
}

export default Grid