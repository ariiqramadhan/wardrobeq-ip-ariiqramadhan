import ItemForm from "../components/ItemForm";

export default function AddItem() {
    return (
        <>
            <div className="w-1/2 mx-auto flex flex-col gap-10 py-20">
            <h1 className="text-4xl self-center font-bold">Add Item</h1>
                <ItemForm type={'add'}/>
            </div>
        </>
    );
}
