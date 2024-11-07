'use client';

import styles from './LoginForm.module.scss';
import { signInWithCredentials } from '@/serverActions/auth'; // 실제 서버 액션 함수가 클라이언트에서 접근 가능해야 함
import { useState } from 'react';
import LoginButton from './LoginButton';

export default function LoginForm() {
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 폼 데이터 가져오기
        const formData = new FormData(event.currentTarget);
        const account = formData.get('account');
        const password = formData.get('password');
        console.log('formData', formData)

        try {
            const response = await signInWithCredentials({ message: '' }, formData);
            console.log('11111', response)
            if (response && response.message) {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('로그인 실패');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.label}>아이디</div>
            <input 
                name='account'
                type="text"
                placeholder='아이디를 입력하세요'
            />

            <div className={styles.label}>비밀번호</div>
            <input 
                name='password'
                type='password'
                placeholder='비밀번호를 입력하세요'
            />
            <LoginButton name='로그인' />

            <div className={styles.error}>
                {message}
                <br />
                env: {process.env.NEXT_PUBLIC_BASE_URL}
            </div>
        </form>
    );
}





// 'use client';

// import styles from './LoginForm.module.scss';
// import { signInWithCredentials } from '@/serverActions/auth';
// import { useFormState } from 'react-dom';
// import LoginButton from './LoginButton';
// // import { FormEventHandler, useState } from 'react';

// // import { signIn } from '@/auth'; // 서버 환경에서는 이거 써야함!
// // import { signIn } from 'next-auth/react'; // 클라이언트 환경에서는 이걸 써야함


// export default function LoginForm() {

//     const [state, action] = useFormState(signInWithCredentials, {
//         message:''
//     })

//     return (
//         <form action={action} className={styles.container}>
//             <div className={styles.label}>아이디</div>
//             <input 
//             name='account'
//             type="text"
//             placeholder='아이디를 입력하세요'
//             />

//             <div className={styles.label}>비밀 번호</div>
//             <input 
//             name='password'
//             type='password'
//             placeholder='비밀번호를 입력하세요'
//             />
//             <LoginButton name='로그인' />

//             <div className={styles.error}>
//                 {state.message}
//                 env !
//                 {process.env.NEXT_PUBLIC_BASE_URL}
//             </div>
//         </form>

//     )
// }