import Link from "next/link";
import styles from './page.module.scss'

export default function Page({params}:{params: {clipQRId:string}}) {

    const clipQRId = params.clipQRId;

    return (
        <div className={styles.container}>

            <div className={styles.messageContainer}>
                <img src="/icons/completeIcon.png" alt="" />
                <div className={styles.text}>
                    <div>처리가 완료되면</div>
                    <div>담당자에게 안내드릴게요!</div>
                </div>
            </div>
            <Link 
            href={`/resident/${clipQRId}entrance`}
            className={styles.button}
            >닫기
            </Link>
        </div>
    )
}