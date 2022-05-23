import styles from './footer.module.css';

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.container_body}>
                <div className={styles.link_container}>

                    <div className={styles.link_block}>
                        <h3>Community</h3>
                        <div className={styles.links}>
                            <a href="#">Documentation</a>
                            <a href="#">Roadmap</a>
                            <a href="#">Discussions</a>
                            <a href="#">Issues</a>
                        </div>
                    </div>

                    <div className={styles.link_block}>
                        <h3>More</h3>
                        <div className={styles.links}>
                            <a href="#">Status</a>
                            <a href="#">Term of Service</a>
                            <a href="#">Privacy</a>
                            <a href="#">Credits</a>
                        </div>
                    </div>
                    
                </div>
                <p>Copyright © 2022 rickycorte.</p>
            </div>
        </div>
    )
}