import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatItemsAll } from '../app/itemSlice';
import { getOutift, setLoading, setOutput } from '../app/aiSlice';

export default function Drip() {
    const catItem = useSelector((state) => state.item.value);
    const user = useSelector((state) => state.user.value);
    const ai = useSelector((state) => state.ai.value);
    const aiLoading = useSelector((state) => state.ai.loading);
    const dispatch = useDispatch();

    function generateOutfit() {
        dispatch(setOutput(''));
        dispatch(setLoading(false));
        dispatch(getOutift(catItem, user.skinUndertone));
    }

    useEffect(() => {
        dispatch(setOutput(''));
        dispatch(setLoading(false));
        dispatch(getCatItemsAll());
    }, []);
    return (
        <>
            <div className="flex flex-col gap-5 h-[calc(100vh-81.5px)] justify-center items-center">
                {ai ? (
                    <div className="p-5 rounded-lg flex bg-[#F2F2F2] shadow-xl items-center justify-center">
                        <h1 className="whitespace-pre-line">{ai}</h1>
                    </div>
                ) : (
                    ''
                )}
                {aiLoading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                    ''
                )}
                <button
                    className="btn btn-error text-white rounded-full"
                    onClick={generateOutfit}
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
                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                        />
                    </svg>
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
            </div>
        </>
    );
}
