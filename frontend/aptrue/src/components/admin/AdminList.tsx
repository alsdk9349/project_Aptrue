"use client"

import TableItem from "./TableItem";
import DefaultTableItem from "./DefaultTableItem";

interface AdminListProps {
    admins: GetAdmin[];
    remainsNum: number;
    pageNum: string;
}

export default function AdminList({
    admins,
    remainsNum,
    pageNum,
} : AdminListProps ) {

    // 10개씩 자르는데 10개 보다 적으면 뒤에 남은 수 배열로 붙여주기
    const remains = Array.from({ length: remainsNum }, (_, i) => i + 1 + admins.length + (Number(pageNum) - 1) * 10);

    return (
        <>
            {admins.map((admin, index) => 
                <TableItem 
                key={index}
                adminID={admin.adminID}
                name={admin.name}
                account={admin.account}
                password={admin.password}
                phone={admin.phone}
                createdAt={admin.createdAt}
                />
            )}
            {remains.map((number) =>
                <DefaultTableItem 
                key={number} // 고유한 키사용
                id={number}
                />
            )}
        </>
    );
}