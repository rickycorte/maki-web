import styles from './footer.module.css';

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.container_body}>
                <div className={styles.link_container}>

                    <div className={styles.link_block}>
                        <h3>Community</h3>
                        <div className={styles.links}>
                            <a href="https://docs.makichan.xyz">Documentation</a>
                            <a href="https://github.com/rickycorte/maki-web/projects/1">Roadmap</a>
                            <a href="https://github.com/rickycorte/maki-web/discussions">Discussions</a>
                            <a href="https://github.com/rickycorte/maki-web/issues">Issues</a>
                        </div>
                    </div>

                    <div className={styles.link_block}>
                        <h3>More</h3>
                        <div className={styles.links}>
                            <a href="/status">Status</a>
                            <a href="/tos">Term of Service</a>
                            <a href="/privacy">Privacy</a>
                            <a href="/credits">Credits</a>
                        </div>
                    </div>

                </div>
                <p>Copyright © 2022 rickycorte.</p>
            </div>
        </div>
    )
}