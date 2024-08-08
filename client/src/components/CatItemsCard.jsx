import { Link } from 'react-router-dom';
import defaultPict from '../assets/Saly-22.png';

export default function CatItemsCard({ item }) {
    return (
        <>
        <Link to={`/items/${item.id}`}>
            <div className="card bg-base-100 w-64 h-80 shadow-xl rounded-none">
                <figure>
                    <img
                        src={item.imageUrl ? item.imageUrl : defaultPict}
                        alt={`${item.name}-pict`}
                        className="h-64 w-64 object-cover"
                    />
                </figure>
                <div className="card-body tooltip tooltip-bottom" data-tip={item.name}>
                    <h2 className="card-title text-base line-clamp-1">{item.name}</h2>
                </div>
            </div>
        </Link>
        </>
    );
}
