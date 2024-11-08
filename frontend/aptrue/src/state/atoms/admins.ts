import { atom } from "recoil";

export const adminState = atom({
    key:'adminState',
    default: {
        adminID: 0,
        account:'',
        name:'',
        isSuperAdmin:false,
    },
})

// atom : 상태를 정의하고 저장함. 읽거나 업데이트 할때 사용
