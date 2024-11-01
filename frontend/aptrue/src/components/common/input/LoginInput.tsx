"use client"

import { useState } from "react";
import styles from './LoginInput.module.scss'

export default function LoginInput ({
    label,
    onChange,
    placeholder
} : {
    label:string;
    onChange:(value:string) => void;
    placeholder:string;
}) {

    const [inputValue, setInputValue] = useState<string>("");

    const changeValue = (event:React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;
        setInputValue(value)
        onChange(value)
    }


    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <input 
            type="text"
            onChange={changeValue}
            placeholder={placeholder}
            />
        </div>
    )
}