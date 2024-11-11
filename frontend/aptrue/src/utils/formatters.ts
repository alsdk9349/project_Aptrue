
// 전화번호 숫자만 받고 형식 변환시키는 함수
export function formatPhoneNumber(value:string) {

    const phoneNumber = value.replace(/\D/g, ''); // 숫자만 남기기

     // 전화번호 길이에 따라 포맷팅 적용
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;

};

export function isValidPassword(password: string) {
    // 특수문자, 알파벳, 숫자가 모두 포함되고 한글이 포함되지 않도록 검사
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const containsKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    // 한글이 포함되지 않고, 비밀번호 조건을 만족하는지 검사
    return regex.test(password) && !containsKorean.test(password);
}


export function isValidPhoneNumber(phone: string) {
    // 전화번호가 010-0000-0000 형식인지 검사
    const phoneNumber = phone.replace(/\D/g, ''); // 숫자만 남기기
    return phoneNumber.length === 11 && /^010-\d{4}-\d{4}$/.test(phone);
}


// ^(?=.*[A-Za-z]): 알파벳이 최소 1자 이상 포함
// (?=.*\d): 숫자가 최소 1자 이상 포함
// (?=.*[@$!%*#?&]): 특수 문자가 최소 1자 이상 포함
// [A-Za-z\d@$!%*#?&]{8,}$: 위 조건을 만족하면서 전체 길이가 8자 이상이어야 함