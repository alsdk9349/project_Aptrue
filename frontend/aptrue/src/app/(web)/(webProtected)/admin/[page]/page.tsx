import TableItem from "@/components/admin/TableItem";
import DefaultTableItem from "@/components/admin/DefaultTableItem";
import Pagination from "@/components/common/pagination/Pagination";
import styles from './page.module.scss';

// params값만 받아서 활용하는 서버컴포넌트!

async function AdminList({pageNum}:{pageNum:string}) {


    // api/admin/list/{page}/{limit}
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/list/${pageNum}/10`, { next: {tags: ['adminList']} })

    if (!response.ok) {
        return <div>오류가 발생했습니다</div>
    }

    const result = await response.json();
    const admins : GetAdmin[] =  result.data;
    const remains :number = 10 - admins.length;

    // 10개씩 자르는데 10개 보다 적으면 뒤에 남은 수 배열로 붙여주기
    const remainNumbers = Array.from({length:remains}, (_, i) => i+1 + admins.length + (Number(pageNum)-1)*10);

    return (
        <div>
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
            {remainNumbers.map((number, index) =>
                <DefaultTableItem 
                key={index}
                id={number}
                />
            )}
        </div>
    );
}

export default async function Page({params}:{params: {page:string} }) {

    const page = params.page;

    // 관리자 목록 전체 조회 API 불러오기

    return (
        <>
            <AdminList pageNum={page}/>
            <div className={styles.pagination}>
                <Pagination pageNum={page} urlPath="admin" />
            </div>
        </>
    )
}