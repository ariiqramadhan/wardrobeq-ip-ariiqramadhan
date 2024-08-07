import CatCard from "./CatCard";

export default function HomeCategory({ cat }) {
    return (
        <>
            <div className="w-full flex border-b">
                <div className="flex flex-col w-1/5 border-r gap-3 py-3 pr-3">
                    <h1 className="text-xl font-medium">{cat.name}</h1>
                    <p className="font-thin text-sm text-justify pb-8">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Totam ratione optio quis, eligendi veritatis sit
                        itaque architecto asperiores eum commodi?
                    </p>
                    <button className="btn btn-sm w-20 rounded-full">
                        See All
                    </button>
                </div>
                <div className="p-5 flex w-4/5 gap-5 overflow-x-auto">
                    {cat.Items.map((item, i) => {
                        return <CatCard key={i} item={item}/>
                    })}
                </div>
            </div>
        </>
    );
}
