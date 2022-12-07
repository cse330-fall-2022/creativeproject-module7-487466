import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

function ViewItems() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login");
        }
    }, []);

    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);


    async function deleteItem(id, seller) {
        if ((JSON.parse(localStorage.getItem('user-info'))).id == seller) {
            //delete comments on item to be deleted
            let deleteComments = await fetch("http://localhost:8000/api/deleteComments/" + id, {
                method: 'DELETE'
            });
            deleteComments = await deleteComments.json();

            //delete item
            let result = await fetch("http://localhost:8000/api/delete/" + id, {
                method: 'DELETE'
            });
            result = await result.json();
            getItems();
        }
        else {
            alert("you can only delete your own items");
        }

    }
    async function getItems() {
        //if filter is applied, only get items with the category
        if (category == "clothing" || category == "electronics" || category == "toys" || category == "other") {
            let result = await fetch("http://localhost:8000/api/filter/" + category);
            result = await result.json();
            setData(Object.values(result));
        }
        else {
            let result = await fetch("http://localhost:8000/api/list");
            result = await result.json();
            setData(Object.values(result));
        }

    }
    useEffect(() => {
        getItems();
    }, [])

    useEffect(() => {
        getItems();
    }, [category])

    function viewButton(name, description, price, image, seller, id) {
        localStorage.setItem("item-name", name);
        localStorage.setItem("item-description", description);
        localStorage.setItem("item-price", price);
        localStorage.setItem("item-image", image);
        localStorage.setItem("item-seller", seller);
        localStorage.setItem("item-id", id);
        navigate("/" + id);
    }

    function updateButton(name, description, price, image, seller, id, category) {
        if ((JSON.parse(localStorage.getItem('user-info'))).id == seller) {
            localStorage.setItem("item-name", name);
            localStorage.setItem("item-description", description);
            localStorage.setItem("item-price", price);
            localStorage.setItem("item-image", image);
            localStorage.setItem("item-seller", seller);
            localStorage.setItem("item-id", id);
            localStorage.setItem("item-category", category);
            navigate("/update/" + id);
        }
        else {
            alert("you can only edit your items");
        }
    }

    return (
        <div>
            <Header />
            <h1>Items For Sale</h1>
            Filter Items:
            <Button value={null} onClick={(e) => setCategory(e.target.value)} className="filter_buttons"> View All </Button>
            <Button value={"clothing"} onClick={() => setCategory("clothing")} className="filter_buttons"> Clothing </Button>
            <Button onClick={() => setCategory("electronics")} className="filter_buttons"> Electronics </Button>
            <Button onClick={() => setCategory("toys")} className="filter_buttons"> Toys </Button>
            <Button onClick={() => setCategory("other")} className="filter_buttons"> Other </Button>
            
            <Table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Seller Id</th>
                    </tr>
                    {
                        data.map((item) =>
                            <tr>
                                <td >{item.item}</td>
                                <td>{item.description}</td>
                                <td>${item.price}</td>
                                <td><img style={{ width: 200 }} src={item.image} /></td>
                                <td>{item.seller_id}</td>
                                <td><span><Button onClick={() => viewButton(item.item, item.description, item.price, item.image, item.seller_id, item.id)} className="view">View</Button></span></td>
                                <td><span><Button onClick={() => deleteItem(item.id, item.seller_id)} className="delete">Delete</Button></span></td>
                                <td><span><Button onClick={() => updateButton(item.item, item.description, item.price, item.image, item.seller_id, item.id, item.category)} className="update">Edit</Button></span></td>

                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}
export default ViewItems;