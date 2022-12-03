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
    useEffect(() => {
        getItems();
    }, [])
    //  console.warn("result", data);

    async function deleteItem(itemName) {
        let result = await fetch("http://localhost:8000/api/delete/" + itemName, {
            method: 'DELETE'
        });
        result = await result.json();
        console.warn(result);
        getItems();
    }
    async function getItems() {
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result);
    }
   // getItems();

    return (
        <div>
            <Header />
            <h1>Items For Sale</h1>
            <Table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Seller</th>
                    </tr>
                    {
                        data.map((item) =>
                            <tr>
                                <td>{item.item}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td><img style={{ width: 200 }} src={item.image} /></td>
                                <td>{item.seller}</td>
                                <td><span><Button onClick={() => deleteItem(item.item)} className="delete">Delete</Button></span></td>
                            </tr>
                        )
                    }
                </tbody>

            </Table>

        </div>
    );
}
export default ViewItems;