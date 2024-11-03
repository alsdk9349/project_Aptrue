"use client"
import LoginInput from "@/components/common/input/LoginInput"

export default function Page() {

    const changeLogin = () => {

    }

    return (
        <>
            <LoginInput
            label="아이디"
            onChange={changeLogin}
            placeholder="아이디를 입력하세요"
            />
            <LoginInput
            label="비밀번호"
            onChange={changeLogin}
            placeholder="비밀번호를 입력하세요"
            />
        </>
    )
}