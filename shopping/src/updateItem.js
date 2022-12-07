import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function UpdateItem() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login");
        }
    }, []);

    async function update() {

        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let price = document.getElementById("price").value;
        let image = document.getElementById("image").value;
        const category = localStorage.getItem('item-category')

        //make sure everything is filled in
        let isFilled = true;
        if (name.toString() == "") {
            isFilled = false;
        }
        if (description.toString() == "") {
            isFilled = false;
        }
        if (price.toString() == "") {
            isFilled = false;
        }
        if (image.toString() == "") {
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
        else if (decimal.includes("e-")) {
            priceValid = false;
        }
        else if (price >= 4294967295) {
            priceValid = false;
        }
        else if (isNaN(price)) {
            priceValid = false;
        }

        let info = { name, description, price, image, category };
        if (isFilled && priceValid) {

            let result = await fetch("http://localhost:8000/api/updateItem/" + localStorage.getItem('item-id'), {
                method: 'PUT',
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": 'application/json',
                    //     "Accept": 'application/json'
                }
            });
            result = await result.json();
            localStorage.setItem("item-name", name);
            localStorage.setItem("item-description", description);
            localStorage.setItem("item-price", price);
            localStorage.setItem("item-image", image);
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
            <h1>Update {localStorage.getItem('item-name')}</h1>
            <form>
                Item Name: <br />
                <input type="text" defaultValue={localStorage.getItem('item-name')} id="name" required />
                <br /><br />
                Description: <br />
                <input type="text" defaultValue={localStorage.getItem('item-description')} id="description" required />
                <br /><br />
                Price: <br />
                <input type="number" defaultValue={localStorage.getItem('item-price')} id="price" step="0.01" min="0" required />
                <br /><br />
                Image Link: <br />
                <input type="text" defaultValue={localStorage.getItem('item-image')} id="image" required />
                <br /><br />
                <Button onClick={() => update()}>Update</Button>
            </form>
        </div>
    );
}
export default UpdateItem;