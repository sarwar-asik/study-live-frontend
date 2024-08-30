import { useAddPointsMutation, useGetSingleUserQuery } from '@/redux/api/userApi.ts';
import { IUserDataType } from '@/type/dataType/user.data'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddPointsComponent({ user }: { user: IUserDataType }) {
    const { data } = useGetSingleUserQuery(user?.id ?? "1");
    const [addPoints] = useAddPointsMutation()
    const navigate = useNavigate();
    // console.log(data)
    const userLiveData = data?.data

    const [showModal, setShowModal] = useState(false);

    // console.log(userLiveData?.points)
    useEffect(() => {
        console.log('ok')
        if (userLiveData?.points !== undefined && userLiveData?.points < 2) {
            // console.log('yessssss');
            setShowModal(true);
        }
    }, [userLiveData?.points]);

    const handleAddPointsAndClose = async () => {
        if (userLiveData?.id && userLiveData?.points !== undefined && userLiveData?.points < 2) {
            try {
                const response = await addPoints({ id: userLiveData.id, points: 10 }).unwrap()
                if (response) {
                    setShowModal(false)
                }

                // console.log(response, "response")
                // Close the modal
            } catch (error) {
                console.error("Error adding points:", error);

            }
        } else {
            // setShowModal(false);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/');
    };
    // console.log(showModal, "showModal")
    return (
        <React.Fragment>
            <div className="">
                {showModal && (
                    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/20 backdrop-blur-sm">
                        <div className="relative max-w-xl p-5 bg-white rounded-lg shadow-lg">
                            <h2 className="text-xl">Your points-{userLiveData?.points} are low</h2>
                            <p className="mb-4">You need to add points to continue using the features.</p>
                            <button
                                onClick={handleAddPointsAndClose}
                                // disabled={isAddingPoints}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80"
                            >
                                Add Points
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="ml-4 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}
