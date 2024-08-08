import { Link, useParams } from 'react-router-dom';
import defaultPict from '../assets/Saly-22.png';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFunFact, setLoading, setOutput } from '../app/aiSlice';
import { getItem } from '../app/itemSlice';

export default function Detail() {
    const ai = useSelector((state) => state.ai.value);
    const item = useSelector(state => state.item.value);
    const aiLoading = useSelector((state) => state.ai.loading);
    const dispatch = useDispatch();
    const { itemId } = useParams();

    function handleFact() {
        dispatch(getFunFact(item.name, item.brand, item.Category.name));
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
                            src={
                                item.imageUrl
                                    ? item.imageUrl
                                    : defaultPict
                            }
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
                            </div>
                            <p className="text-[#696969] text-base">
                                {item.brand
                                    ? item.brand
                                    : 'No Brand'}
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
