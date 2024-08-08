import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../app/userSlice';
import blankPP from '/blank-pp.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../config/axiosinstance';

export default function Navbar() {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate('/login');
    }

    async function handleUpgrade() {
        try {
            const { data } = await axios({
                method: 'get',
                url: '/user/payment/midtrans',
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                },
            });
            window.snap.pay(data.trans_token, {
                onSuccess: async function (result) {
                    /* You may add your own implementation here */
                    toast.success('Payment Success!');
                    await axios({
                        method: 'patch',
                        url: '/user/upgrade',
                        headers: {
                            Authorization: `Bearer ${localStorage.access_token}`,
                        },
                        data: {
                            orderId: data.orderId,
                        },
                    });
                    dispatch(getUser());
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    toast.info('Wating for your payment!');
                    console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    toast.error('Payment Failed!');
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    toast.error(
                        'You closed the popup without finishing the payment'
                    );
                },
            });
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <>
            <div className="navbar bg-transparent py-4 px-8">
                <div className="flex-1 gap-10">
                    <Link
                        className="btn btn-ghost text-3xl text-left p-0"
                        to="/"
                    >
                        WardrobeQ
                    </Link>
                    <div className="flex gap-5">
                        <form className="form-control">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered w-24 md:w-auto rounded-full focus:outline-none focus:border"
                            />
                        </form>
                        <Link to="/items">
                            <button className="btn bg-black rounded-full text-white">
                                All Item
                            </button>
                        </Link>
                        {user.type === 'Premium' ? (
                            <Link to="/drip">
                                <button className="btn btn-error rounded-full text-white">
                                    Get Dripped
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                        />
                                    </svg>
                                </button>
                            </Link>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <Link
                        className="rounded-full hover:bg-[#F2F2F2] p-1"
                        to="/add-item"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </Link>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex="0"
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 h-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={
                                        user.imageUrl ? user.imageUrl : blankPP
                                    }
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <h1 className="text-lg font-semibold hover:bg-transparent select-none">
                                    {user.name ? user.name : `User ${user.id}`}
                                </h1>
                            </li>
                            <li>
                                <Link className="justify-between" to="/profile">
                                    Profile
                                </Link>
                            </li>
                            {user.type === 'Basic' ? (
                                <li>
                                    <button
                                        className="text-left"
                                        onClick={handleUpgrade}
                                    >
                                        Upgrade
                                    </button>
                                </li>
                            ) : (
                                ''
                            )}

                            <li>
                                <button
                                    className="text-left text-red-500"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
