import styles from './Table.module.scss';
import classNames from 'classnames';
import {format} from 'date-fns';
import { ko } from 'date-fns/locale';
import DeleteButton from './DeleteButton';
import ChangePasswordButton from './ChangePasswordButton';

export default function TableItem({
    index,
    adminID,
    name,
    account,
    password,
    phone,
    createdAt
} : {index:number} & GetAdmin) {


    return (
        <div className={ classNames(
            styles.container, styles.isTableItem
            )}>
            <div className={styles.no}>{index}</div>
            <div className={styles.name}>{name}</div>
            <div className={styles.id}>{account}</div>
            <div className={styles.password}>{password}</div>
            <div className={styles.phoneNumber}>{phone}</div>
            <div className={styles.date}>{format(createdAt, 'yyyy-MM-dd', {locale: ko})}</div>
            <div className={styles.blank}>
                <DeleteButton adminId={adminID}/>
            </div>
            <div className={styles.blank}>
                <ChangePasswordButton account={account} adminID={adminID} />
            </div>
        </div>
    )
}