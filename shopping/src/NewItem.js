import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function NewItem() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login");
        }
    }, []);

    const [item, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const seller = (JSON.parse(localStorage.getItem('user-info'))).username;
    console.warn(seller);

    async function addItem() {
        //alert(username + " " + password);
        let info = {item, description, price, image, seller};
        console.warn(info);

        let result = await fetch("http://localhost:8000/api/addItem", {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem("item-info", JSON.stringify(result));
        navigate("/viewitems");
    }

    return (
        <div>
            <Header />
            <h1>Add new item</h1>
            Item Name: <br />
            <input type="text" value={item} onChange={(e) => setName(e.target.value)} className="item" placeholder="item name" />
            <br /> Description: <br />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="description" placeholder="description" size="50" />
            <br /> Price: <br />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="price" step="0.01" min="0"/>
            <br /> Link to Image: <br />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="image" placeholder="image"/>
            
            <div className='register_button'>
                <Button onClick={addItem} className='register'>Add Item</Button>
            </div>
        </div>
    );
}
export default NewItem;