import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

function Item() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login");
        }
    }, []);

    const id = (JSON.parse(localStorage.getItem('user-info'))).id;
    const user = (JSON.parse(localStorage.getItem('user-info'))).username;
    let balance = (JSON.parse(localStorage.getItem('user-info'))).money;
    let price = localStorage.getItem('item-price');
    let seller_id = localStorage.getItem('item-seller');
    let item_id = localStorage.getItem('item-id');

    async function purchase() {
        if ((JSON.parse(localStorage.getItem('user-info'))).id != seller_id) {
            const newBalance = (balance) - (price);
            console.warn(newBalance);
            if (newBalance < 0) {
                alert("error: you do not have enough money in your account");
            }
            else {
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
                localStorage.setItem("user-info", JSON.stringify(result));

                let sellerInfo = await fetch("http://localhost:8000/api/getBalance/" + seller_id);
                sellerInfo = await sellerInfo.json();
                let sellerBalance = parseFloat(sellerInfo.money) + parseFloat(price)
                sellerInfo = { 'amount': sellerBalance.toString() };
                let updateSellerBalance = await fetch("http://localhost:8000/api/addMoney/" + seller_id, {
                    method: 'PUT',
                    body: JSON.stringify(sellerInfo),
                    headers: {
                        "Content-Type": 'application/json',
                        //     "Accept": 'application/json'
                    }
                });
                updateSellerBalance = await updateSellerBalance.json();
                //  console.warn(updateSellerBalance);
                navigate("/");
            }
        }
        else {
            alert("you cannot buy your own item");
        }
    }

    async function comment() {
        let comment = document.getElementById("comment").value;
        let commentInfo = { 'comment': comment, 'item_id': item_id, 'commenter_id': id, 'commenter': user };
        let saveComment = await fetch(("http://localhost:8000/api/addComment/"), {
            method: 'POST',
            body: JSON.stringify(commentInfo),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        saveComment = await saveComment.json();
        setData([...data, saveComment]);
        //navigate("/");
    }


    async function displayComments() {
        let comment_info = await fetch("http://localhost:8000/api/listComments/" + item_id);
        comment_info = await comment_info.json();
        setData(Object.values(comment_info));

    }

    const [data, setData] = useState([]);
    useEffect(() => {
        displayComments();
    }, []);



    return (
        <div>
            <Header />
            <h1>{localStorage.getItem('item-name')}</h1>
            <h5>${localStorage.getItem('item-price')}</h5>
            <h6>{localStorage.getItem('item-description')}</h6>
            <img style={{ width: 350 }} src={localStorage.getItem('item-image')} className="view_image" />
            <br />
            <Button onClick={purchase} className='purchase'>Purchase</Button>
            <div className="comment_section">
                <h4>Comments:</h4>
                <div id="comments" className="comments">
                    <Table>
                        <tbody>
                            <tr>
                                <th>username:</th>
                                <th>comment:</th>

                            </tr>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.commenter}</td>
                                        <td>{item.comment}</td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </Table>
                </div>
                Add a comment: <br />
                <input type="text" placeholder="enter comment" id="comment" /> <br />
                <Button onClick={comment}>Comment</Button>
            </div>
        </div>
    );
}
export default Item;