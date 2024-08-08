import { Link, useNavigate, useParams } from 'react-router-dom';
import defaultPict from '../assets/Saly-22.png';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFunFact, setLoading, setOutput } from '../app/aiSlice';
import { deleteItem, getItem } from '../app/itemSlice';

export default function Detail() {
    const ai = useSelector((state) => state.ai.value);
    const item = useSelector((state) => state.item.value);
    const aiLoading = useSelector((state) => state.ai.loading);
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const navigate = useNavigate();

    function handleFact() {
        dispatch(getFunFact(item.name, item.brand, item.Category.name));
    }

    function handleDelete() {
        dispatch(deleteItem(itemId));
        navigate('/');
    }

    useEffect(() => {
        dispatch(setOutput(''));
        dispatch(setLoading(false));
        dispatch(getItem(itemId));
    }, []);

    return (
        <>
            <div className="p-20">
                <div className="flex h-[calc(100vh-81.5px-10rem)] gap-10">
                    <div className="w-1/2 bg-[#F2F2F2] rounded-lg">
                        <img
                            src={item.imageUrl ? item.imageUrl : defaultPict}
                            alt={`${item.name}-pict`}
                            className="w-full h-full object-scale-down rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 grid grid-rows-3 gap-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-bold">
                                    {item.name}
                                </h1>
                                <Link to={`/items/${item.id}/edit`}>
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
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                    </svg>
                                </Link>
                                <button
                                    className="text-red-400"
                                    onClick={() =>
                                        document
                                            .getElementById('del-confirm')
                                            .showModal()
                                    }
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
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </button>
                                <dialog id="del-confirm" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                            Delete item?
                                        </h3>
                                        <p className="py-4">
                                            Are you sure you want to delete this
                                            item?
                                        </p>
                                        <div className="modal-action">
                                            <form
                                                method="dialog"
                                                className="flex gap-3"
                                            >
                                                <button
                                                    className="btn btn-success text-white"
                                                    type="button"
                                                    onClick={handleDelete}
                                                >
                                                    Yes
                                                </button>
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-error text-white">
                                                    Cancel
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <p className="text-[#696969] text-base">
                                {item.brand ? item.brand : 'No Brand'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="font-bold">
                                Color -{' '}
                                <span className="font-normal">
                                    {item.color}
                                </span>
                            </p>
                            <div className="h-[calc(100%-2.25rem)]">
                                <p className="font-semibold pb-3">
                                    Descriptions
                                </p>
                                <p className="text-[#696969] overflow-y-auto h-[calc(100%-1.75rem)]">
                                    {item.description
                                        ? item.description
                                        : 'No Description'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <button
                                className="btn w-24 rounded-full tooltip tooltip-right"
                                data-tip="Click me to see fun fact!"
                                type="button"
                                onClick={handleFact}
                            >
                                Faxx
                            </button>
                            <div className="flex self-center justify-center h-full">
                                {aiLoading ? (
                                    <span className="loading loading-spinner loading-lg self-center"></span>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {ai ? (
                    <div className="w-full mt-10 text-justify p-5 bg-[#F2F2F2] rounded-lg shadow-lg">
                        <p>{ai}</p>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}
