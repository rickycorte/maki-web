import styles from './errorPageBody.module.css';

export default function ErrorPageBody({img, title, message}){
    if (message == null){
        message = "Something went wrong with your request!"
    }
    if(title == null) {
        title = "Wait Sen(pi)!?!?"
    }
    if(img == null) {
        img = '/img/character_frightened.png'
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_body}>
                <img src={img} className={styles.image}></img>
                <div className={styles.text_container}>
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}