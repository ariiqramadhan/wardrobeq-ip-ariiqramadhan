import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getItemByCat } from '../app/itemSlice';
import CatItemsCard from '../components/CatItemsCard';

export default function CategoryItems() {
    const cat = useSelector(state => state.item.value);
    const dispatch = useDispatch();
    const { catId } = useParams();

    useEffect(() => {
        dispatch(getItemByCat(catId));
    }, []);
    return (
        <>
            <div className="container mx-auto p-10">
                <div className="w-1/2 pb-10">
                    <h1 className="text-4xl font-semibold">{cat.name}</h1>
                    <p className="text-base font-thin">{cat.description}</p>
                </div>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
                    {Array.isArray(cat.Items) && cat.Items.map(item => <CatItemsCard key={item.id} item={item}/>)}
                </div>
            </div>
        </>
    );
}
