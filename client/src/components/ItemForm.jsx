import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addItem, editItem, getItem, setItem } from '../app/itemSlice';

export default function ItemForm({ type }) {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const item = useSelector(state => state.item.value);
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    function handleAdd() {
        dispatch(addItem(name, color, brand, description, category));
        navigate('/');
    }

    function handleEdit() {
        dispatch(editItem(name, color, brand, description, category, itemId));
        navigate(`/items/${itemId}`);
    }

    function handleTask(e) {
        e.preventDefault();
        switch(type) {
            case 'add':
                handleAdd();
                break;
            case 'edit':
                handleEdit();
                break
        }
    }

    useEffect(() => {
        if (itemId) {
            dispatch(getItem(itemId));
        } else {
            dispatch(setItem({}));
        }
    }, []);

    useEffect(() => {
        setName(item.name);
        setColor(item.color);
        setBrand(item.brand);
        setDescription(item.description);
        setCategory(item.CategoryId);
    }, [item]);

    return (
        <>
            <form className="bg-[#F2F2F2] p-5 rounded-lg shadow-xl" onSubmit={handleTask}>
                <label htmlFor="name" className="form-control">
                    <div className="label">
                        <span className="label-text">Name <span className='text-red-400'>*</span></span>
                    </div>
                    <input
                        type="text"
                        id="name"
                        className="input input-bordered"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label htmlFor="color" className="form-control">
                    <div className="label">
                        <span className="label-text">Color <span className='text-red-400'>*</span></span>
                    </div>
                    <input
                        type="text"
                        id="color"
                        className="input input-bordered"
                        defaultValue={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </label>
                <label htmlFor="brand" className="form-control">
                    <div className="label">
                        <span className="label-text">Brand</span>
                    </div>
                    <input
                        type="text"
                        id="brand"
                        className="input input-bordered"
                        defaultValue={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </label>
                <label htmlFor="description" className="form-control">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea
                        id="description"
                        className="input input-bordered h-24 p-2"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </label>
                <label htmlFor="category" className="form-control pb-8">
                    <div className="label">
                        <span className="label-text">Category <span className='text-red-400'>*</span></span>
                    </div>
                    <select
                        id="category"
                        className="select select-bordered"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category ? category : 'Select One!'}
                    >
                        <option disabled>Select One!</option>
                        <option value="1">Shirt</option>
                        <option value="2">Outer</option>
                        <option value="3">Pants</option>
                        <option value="4">Footwear</option>
                    </select>
                </label>
                <div className="flex justify-end gap-3">
                    <button
                        className="btn btn-success text-white"
                        type="submit"
                    >
                        {type === 'add' ? 'Add' : 'Save'}
                    </button>
                    <Link to={type === 'add' ? '/' : `/items/${itemId}`}>
                        <button className="btn btn-error text-white">
                            Cancel
                        </button>
                    </Link>
                </div>
            </form>
        </>
    );
}
