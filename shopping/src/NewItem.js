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
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const seller_id = (JSON.parse(localStorage.getItem('user-info'))).id;

    async function addItem() {
        //check each thing is filled in
        let isFilled = true;
        if (item.toString() == "") {
            isFilled = false;
        }
        if (description.toString() == "") {
            isFilled = false;
        } 
        if (price.toString() == "") {
            isFilled = false;
        } 
        if (category.toString() == "") {
            isFilled = false;
        }
        if(image.toString() == "") {
            isFilled = false;
        }

        //make sure price is valid
        let priceValid = true;
        let decimal = price.toString();
        if (price < 0) {
            priceValid = false;
        } 
        else if (decimal.includes(".") && decimal.split(".")[1].length > 2) {
            priceValid = false;
        }
        else if(decimal.includes("e-")) {
            priceValid = false;
        }
        else if(price >= 4294967295) {
            priceValid = false;
        }
        else if(isNaN(price)) {
            priceValid = false;
        }

        let info = { item, description, price, image, seller_id, category };

        if (isFilled && priceValid) {
            let result = await fetch("http://localhost:8000/api/addItem", {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            result = await result.json();
            navigate("/");
        }
        else if(!isFilled) {
            alert("all sections must be filled in");
        }
        else {
            alert("price not valid");
        }

    }

    return (
        <div>
            <Header />
            <h1>Add new item</h1>
            <b> Item Name: </b> <br />
            <input type="text" value={item} onChange={(e) => setName(e.target.value)} className="item" placeholder="item name" required />
            <br /> <b>Description:</b>  <br />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="description" placeholder="description" required />
            <br /> <b>Price:</b>  <br />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="price" step="0.01" min="0" required />
            <br /> <b> Category:</b>  <br />
            <div onChange={(e) => setCategory(e.target.value)}>
                <input type="radio" value="clothing" name="category" /> Clothing <br />
                <input type="radio" value="electronics" name="category" /> Electronics <br />
                <input type="radio" value="toys" name="category" /> Toys <br />
                <input type="radio" value="other" name="category" /> Other
            </div>
            <b>  Link to Image: </b> <br />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="image" placeholder="image" required />

            <div className='register_button'>
                <Button onClick={addItem} className='register'>Add Item</Button>
            </div>
        </div>
    );
}
export default NewItem;