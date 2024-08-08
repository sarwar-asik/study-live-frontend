import UserCard from '@/components/user/UserCard';
import AuthContext from '@/context/AuthProvider';
import { useContext } from 'react'
import LoaderData from '../../components/shared/LoaderData';
import { useGetAllUserQuery } from '@/redux/api/userApi.ts';

const UsersPage = () => {
    const { user } = useContext(AuthContext)
    const { data, isLoading } = useGetAllUserQuery(undefined)

    // console.log(data);
    const usersData = data?.data
    return (
        <div className='bg-secondary  pt-[4rem] container mx-auto'>
            <h2 className='text-3xl font-bold text-white my-5'>All Users </h2>
            {isLoading && <LoaderData />}
            {
                usersData?.length && usersData?.length < 1 && <div>
                    <h2 className='text-3xl font-bold text-white my-7'>No Users Found </h2>
                </div>
            }
            <div className=" container grid grid-cols-2 md:gird-cols-3 lg:grid-cols-5  gap-7" >

                {
                    usersData?.filter(userN => userN.id !== user?.id).map(user => <UserCard key={user.id} user={user} />)
                }
            </div>
        </div>
    );
};

export default UsersPage;