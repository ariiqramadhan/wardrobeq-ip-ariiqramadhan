import { useDispatch, useSelector } from "react-redux";
import HomeCategory from "../components/HomeCategory";
import { useEffect } from "react";
import { getCatItems } from "../app/catSlice";

export default function Home() {
    const catItems = useSelector(state => state.cat.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCatItems());
    }, []);

    return (
        <>
            <div className="w-[calc(100vw-4rem)] border-t ml-8">
                <div className="flex flex-col">
                    {catItems.map(cat => <HomeCategory key={cat.id} cat={cat}/>)}
                </div>
            </div>
        </>
    );
}
