import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';


function Profile() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login");
        }
    }, []);

    const user = (JSON.parse(localStorage.getItem('user-info'))).username;
    const id = (JSON.parse(localStorage.getItem('user-info'))).id;
    let balance = (JSON.parse(localStorage.getItem('user-info'))).money;


    async function addMoney() {
        //make sure amount is valid
        let isValid = true;
        let add = parseFloat(document.getElementById("amount").value);
        let decimal = add.toString();
       
       // console.warn(decimal);
        if (add < 0) {
            isValid = false;
        }
        else if (decimal.includes(".") && decimal.split(".")[1].length > 2) {
            isValid = false;
        }
        else if(decimal.includes("e-")) {
            isValid = false;
        }
        else if(add >= 4294967295) {
            isValid = false;
        }
        else if(isNaN(add)) {
            isValid = false;
        }
        if (isValid) {
            const newBalance = parseFloat(balance) + add;
            let amount = newBalance.toString();
            let info = { 'amount': amount }
            let result = await fetch("http://localhost:8000/api/addMoney/" + id, {
                method: 'PUT',
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": 'application/json',
                    //     "Accept": 'application/json'
                }
            });
            result = await result.json();
           // console.warn(result);
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/profile");
        }
        else {
            alert("please enter a valid amount of money");
        }
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        getItems();
    }, [])

    async function getItems() {
        let result = await fetch("http://localhost:8000/api/userItems/" + id);
        result = await result.json();

        setData(Object.values(result));

    }

    return (
        <div>
            <Header />
            <h3>Username: {user}</h3>
            <h3>Account Balance: ${balance}</h3>
            <div className="add_money">
                <h5>Add Money:</h5>
                Amount: <br />
                <input type="number" id="amount" step="0.01" min="0" />
                <div className="add_money_button">
                    <Button onClick={addMoney}>Add Money</Button>
                </div>
            </div>
            <div className="your_items">
                <h3>Your items for sale: </h3>
                <Table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                        </tr>
                        {
                            data.map((item) =>
                                <tr>
                                    <td>{item.item}</td>
                                    <td>{item.description}</td>
                                    <td>${item.price}</td>
                                    <td><img style={{ width: 200 }} src={item.image} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
export default Profile;