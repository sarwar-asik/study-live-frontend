import UserCard from '@/components/user/UserCard';
import AuthContext from '@/context/AuthProvider';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { IUserDataType } from '@/type/dataType/user.data';

import { useContext } from 'react'
import LoaderData from '../../components/shared/LoaderData';
import { SERVER_URL } from '@/helper/const';

const UsersPage = () => {
    const { data, loading } = useFetchDataHook<{ data: IUserDataType[] }>(`${SERVER_URL}/user`)
    const { user } = useContext(AuthContext)
    console.log(data);
    return (
        <div className='bg-[#362C38]  pt-[4rem] container mx-auto'>
            <h2 className='text-3xl font-bold text-white my-5'>All Users </h2>
            {loading && <LoaderData />}
            <div className=" container grid grid-cols-2 md:gird-cols-3 lg:grid-cols-5  gap-7" >

                {
                    data?.data?.filter(userN => userN.id !== user?.id).map(user => <UserCard key={user.id} user={user} />)
                }
            </div>
        </div>
    );
};

export default UsersPage;