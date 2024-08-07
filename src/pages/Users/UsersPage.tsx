import UserCard from '@/components/user/UserCard';
import AuthContext from '@/context/AuthProvider';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { IUserDataType } from '@/type/dataType/user.data';

import { useContext } from 'react'
import LoaderData from '../../components/shared/LoaderData';

const UsersPage = () => {
    const { data, loading } = useFetchDataHook<{ data: IUserDataType[] }>(`http://localhost:5001/api/v1/user`)
    const { user } = useContext(AuthContext)
    console.log(data);
    return (
        <div className='min-h-screen my-5 container'>
            {loading && <LoaderData />}
            <div className="grid grid-cols-2 md:gird-cols-3 lg:grid-cols-5  gap-7" >

                {
                    data?.data?.filter(userN => userN.id !== user?.id).map(user => <UserCard key={user.id} user={user} />)
                }
            </div>
        </div>
    );
};

export default UsersPage;