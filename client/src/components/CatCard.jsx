import { Link } from 'react-router-dom';
import defaultPict from '../assets/Saly-22.png'

export default function CatCard({ item }) {
    return (
        <>
            <div className="border shrink-0 w-64 h-64">
                <Link to={`/items/${item.id}`} className='tooltip tooltip-right' data-tip={item.name}>
                    <img
                        src={item.imageUrl ? item.imageUrl : defaultPict}
                        alt={`${item.name}-pict`}
                        className="w-64 h-64 object-cover"
                    />
                </Link>
            </div>
        </>
    );
}
