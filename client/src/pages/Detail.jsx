import { useLocation } from 'react-router-dom';
import defaultPict from '../assets/Saly-22.png';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFunFact, setLoading, setOutput } from '../app/aiSlice';

export default function Detail() {
    const { state } = useLocation();
    const ai = useSelector(state => state.ai.value);
    const aiLoading = useSelector(state => state.ai.loading);
    const dispatch = useDispatch();

    function handleFact() {
        dispatch(getFunFact(state.item.name, state.item.brand, state.catName));
    }

    useEffect(() => {
        dispatch(setOutput(''));
        dispatch(setLoading(false));
    }, []);

    return (
        <>
            <div className="p-20">
                <div className="flex h-[calc(100vh-81.5px-10rem)] gap-10">
                    <div className="w-1/2 bg-[#F2F2F2] rounded-lg">
                        <img
                            src={state.item.imageUrl ? state.item.imageUrl : defaultPict}
                            alt={`${state.item.name}-pict`}
                            className="w-full h-full object-scale-down rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 grid grid-rows-3 gap-3">
                        <div>
                            <h1 className="text-4xl font-bold">{state.item.name}</h1>
                            <p className="text-[#696969] text-base">
                                {state.item.brand}
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="font-bold">
                                Color -{' '}
                                <span className="font-normal">
                                    {state.item.color}
                                </span>
                            </p>
                            <div className="h-[calc(100%-2.25rem)]">
                                <p className="font-semibold pb-3">
                                    Descriptions
                                </p>
                                <p className="text-[#696969] overflow-y-auto h-[calc(100%-1.75rem)]">
                                    {state.item.description
                                        ? state.item.description
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
                                {aiLoading ? <span className="loading loading-spinner loading-lg self-center"></span> : ''}
                            </div>
                        </div>
                    </div>
                </div>
                {ai ? (
                    <div className="w-full mt-10 text-justify p-5 bg-[#F2F2F2] rounded-lg shadow-lg">
                        <p>
                            {ai}
                        </p>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}
