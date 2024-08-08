import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../app/itemSlice";
import CatItemsCard from "../components/CatItemsCard";

export default function AllItem() {
    const item = useSelector(state => state.item.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
    }, []);

    return (
        <>
            <div className="container mx-auto p-10">
                <div className="w-1/2 pb-10">
                    <h1 className="text-4xl font-semibold">All Item <span className="text-[#696969] text-xl">{`(${item.length})`}</span></h1>
                </div>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
                    {Array.isArray(item) && item.map(item => <CatItemsCard key={item.id} item={item}/>)}
                </div>
            </div>
        </>
    )
}