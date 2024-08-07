import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../app/userSlice';
import blankPP from '/blank-pp.jpg'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const user = useSelector(state => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate('/login');
    }

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <>
            <div className="navbar bg-transparent">
                <div className="flex-1 gap-10">
                    <a className="btn btn-ghost text-3xl">WardrobeQ</a>
                    <div className="flex">
                        <form className="form-control">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto rounded-full focus:outline-none focus:border"
                        />
                        </form>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex="0"
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 h-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.imageUrl ? user.imageUrl : blankPP}
                                    className='object-cover'
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <h1 className='text-lg font-semibold select-none'>{user.name ? user.name : `User ${user.id}`}</h1>
                            </li>
                            <li>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <button className='text-left text-red-500' onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}