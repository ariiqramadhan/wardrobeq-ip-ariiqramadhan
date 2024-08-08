import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser, updateUserImage } from '../app/userSlice';
import defaultPP from '/blank-pp.jpg';

export default function Profile() {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [skinUndertone, setSkinUndertone] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (user.name) {
            setName(user.name);
        }
        if (user.skinUndertone) {
            setSkinUndertone(user.skinUndertone);
        }
    }, [user]);

    function uploadImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userImg', image);
        dispatch(updateUserImage(formData));
    }

    function update(e) {
        e.preventDefault();
        dispatch(updateUser(name, skinUndertone));
    }

    return (
        <>
            <div className="w-1/2 mx-auto flex flex-col h-[calc(100vh-81.5px)] gap-10 pt-20">
                <div className="self-center rounded-full">
                    <form onChange={uploadImage}>
                        <div>
                            <label htmlFor="pict">
                                <img
                                    src={
                                        user.imageUrl
                                            ? user.imageUrl
                                            : defaultPP
                                    }
                                    alt="user-pict"
                                    className="w-40 h-40 object-cover rounded-full shadow-xl"
                                    htmlFor="pict"
                                />
                            </label>
                            <input type="file" className="hidden" id="pict" onChange={e => setImage(e.target.files[0])}/>
                        </div>
                    </form>
                </div>
                <form
                    className="bg-[#F2F2F2] p-5 rounded-lg shadow-xl"
                    onSubmit={update}
                >
                    <label htmlFor="name" className="form-control">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input
                            type="text"
                            id="name"
                            className="input input-bordered"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label
                        htmlFor="skinUndertone"
                        className="form-control pb-8"
                    >
                        <div className="label">
                            <span className="label-text">Skin Undertone</span>
                        </div>
                        <select
                            id="skinUndertone"
                            className="select select-bordered"
                            value={
                                skinUndertone ? skinUndertone : 'Select One!'
                            }
                            onChange={(e) => setSkinUndertone(e.target.value)}
                        >
                            <option disabled>Select One!</option>
                            <option value="Warm">Warm</option>
                            <option value="Cool">Cool</option>
                            <option value="Neutral">Neutral</option>
                        </select>
                    </label>
                    <div className="flex justify-end gap-3">
                        <button
                            className="btn btn-success text-white"
                            type="submit"
                        >
                            Save
                        </button>
                        <Link to={'..'}>
                            <button className="btn btn-error text-white">
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
