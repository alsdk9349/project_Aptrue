import TableItem from "@/components/admin/TableItem";
import Button from "@/components/common/button/Button";


async function AdminList() {

    // const response = await fetch('', {cache:})

    // const admins = 

    return (
        <div>
            admins.map - tableitem
        </div>
    );
}

export default async function Page() {

    // 관리자 목록 전체 조회 API 불러오기

    return (
        <div>
            <TableItem 
            adminId={1}
            name="강두홍"
            account="dhkang0912"
            password="apple1234"
            phone="010-1234-5678"
            createdAt="2024-10-02T11:33:22"
            />
            <AdminList />
        </div>
    )
}