import TableItem from "@/components/admin/TableItem";
import Button from "@/components/common/button/Button";
import DefaultTableItem from "@/components/admin/DefaultTableItem";


async function AdminList() {

    // const response = await fetch('', {cache:})

    // const admins = 
    // 10개씩 자르는데 10개 보다 적으면 뒤에 빈거라도 붙여주기
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
            <DefaultTableItem id={2}/>
            <AdminList/>
        </div>
    )
}