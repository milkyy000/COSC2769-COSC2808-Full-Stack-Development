// src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map((item, i) => <li key={i}>{item.name}</li>)}
            </ul>
        </div>
    );
}
