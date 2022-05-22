import React from 'react';
import styles from './gradientTitle.module.css';


class GradientTitle extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
    }

    render() {
        return (
            <div className={styles.title}>
                <div className={styles.title_content}>{this.props.children}</div>
            </div>
        )
    }
}

export default GradientTitle
