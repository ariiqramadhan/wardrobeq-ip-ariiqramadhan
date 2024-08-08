import { Link } from 'react-router-dom';
import CatCard from './CatCard';

export default function HomeCategory({ cat }) {
    return (
        <>
            <div className="w-full flex border-b">
                <div className="flex flex-col w-1/5 border-r gap-3 py-3 pr-3">
                    <h1 className="text-xl font-medium">{cat.name}</h1>
                    <p className="font-thin text-sm text-justify pb-8">
                        {cat.description}
                    </p>
                    <Link to={`/category/${cat.id}`}>
                        <button className="btn btn-sm w-20 rounded-full bg-black text-white">
                            See All
                        </button>
                    </Link>
                </div>
                <div className="p-5 flex w-4/5 gap-5 overflow-x-auto">
                    {cat.Items.map((item, i) => {
                        return <CatCard key={i} item={item} />;
                    })}
                </div>
            </div>
        </>
    );
}
