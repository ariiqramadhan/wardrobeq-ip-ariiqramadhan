import defaultPict from '../assets/Saly-22.png'

export default function CatCard({ item }) {
    return (
        <>
            <div className="border shrink-0">
                <a href="/test">
                    <img
                        src={item.imageUrl ? item.imageUrl : defaultPict}
                        alt={`${item.name}-pict`}
                        className="w-64 h-64 object-cover"
                    />
                </a>
            </div>
        </>
    );
}
