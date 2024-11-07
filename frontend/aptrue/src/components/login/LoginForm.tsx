// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.scss';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('https://ssafy-aptrue.co.kr/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // 쿠키를 포함해 서버와 통신
        });

        const result = await response.json();
        console.log('로그인----성공',result)

        if (result.status === 200) {
            // 로그인 성공 시 관리자 페이지로 이동
            router.push('/');
        } else {
            alert(result.message); // 실패 메시지 표시
        }
    };

    return (
        <form onSubmit={handleLogin} className={styles.container}>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">로그인</button>
        </form>
    );
}




// 'use client';

// import styles from './LoginForm.module.scss';
// import { signInWithCredentials } from '@/serverActions/auth'; // 실제 서버 액션 함수가 클라이언트에서 접근 가능해야 함
// import { useState } from 'react';
// import LoginButton from './LoginButton';

// export default function LoginForm() {
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         // 폼 데이터 가져오기
//         const formData = new FormData(event.currentTarget);
//         const account = formData.get('account');
//         const password = formData.get('password');
//         console.log('formData', formData)
//         console.log(account, password)

//         try {
//             const response = await signInWithCredentials({ message: '' }, formData);
//             console.log('11111', response)
//             if (response && response.message) {
//                 setMessage(response.message);
//             }
//         } catch (error) {
//             setMessage('로그인 실패');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className={styles.container}>
//             <div className={styles.label}>아이디</div>
//             <input 
//                 name='account'
//                 type="text"
//                 placeholder='아이디를 입력하세요'
//             />

//             <div className={styles.label}>비밀번호</div>
//             <input 
//                 name='password'
//                 type='password'
//                 placeholder='비밀번호를 입력하세요'
//             />
//             <LoginButton name='로그인' />

//             <div className={styles.error}>
//                 {message}
//                 <br />
//                 env: {process.env.NEXTAUTH_URL}
//             </div>
//         </form>
//     );
// }





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