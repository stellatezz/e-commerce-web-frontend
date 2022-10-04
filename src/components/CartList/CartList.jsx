import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap'
import React, { useContext, useState, useEffect } from "react";
import { CartStateContext, CartDispatchContext, editCartItem, clearCartItem } from "../../contexts/Cart";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { AuthStateContext, AuthDispatchContext, logout } from "../../contexts/Auth";
import axios from 'axios';

export default function CartList() {
    const { cartItems, totalAmount } = useContext(CartStateContext);
    const { isLoggedIn, user, userID, csrfNonce } = useContext(AuthStateContext);
    const dispatch = useContext(CartDispatchContext);
    const [success, setSuccess] = useState(false);
    const [showPaypal, setshowPaypal] = useState(true);
    const [customID, setcustomID] = useState('');
    const [invoiceID, setinvoiceID] = useState('');
    const [items, setitems] = useState([]);
    const [Warning, setWarning] = useState("");

    function changeCartHandler(value, pid) {
        editCartItem(dispatch, pid, value);
    }

    useEffect(()=>{
        setshowPaypal(true);
        //console.log('hihi');
    },[totalAmount])

    function PayButton() {
        if (!showPaypal) {
            setWarning("");
            return (
                <PayPalScriptProvider deferLoading={showPaypal} options={{ "client-id": "AQnzG2kV1gbhhsz-dYsTlRvhoh6Zc8EDvjIE6t75RhcUYvGTgxDaB8MrTcpD8MvQB0ogLLlJTHqvHI45" }}>
                    <PayPalButtons 
                        style={{ layout: "horizontal" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </PayPalScriptProvider>
            );
        } else {
            return <div/>;
        }
    }

    async function orderHandler() {
        if (cartItems.length === 0) {
            setWarning("Cart is empty!");
            return;
        }
        setWarning("loading payment method...");
        
        const formData = new FormData();
        formData.append('username', user);
        formData.append('uid', userID);
        formData.append('products', JSON.stringify(cartItems));
        formData.append('currency', 'USD');

        try {
            await axios({
              method: "post",
              withCredentials: true,
              url: "https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/order/checkout",
              data: formData,
              headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
            }).then(({data})=>{
                //console.log(data);
                if (data.status == 1) {
                    setcustomID(data.custom_id);
                    setinvoiceID(data.invoice_id);
                    setshowPaypal(false);
                    let tempitems = cartItems.map((item) => {
                        return {
                            name: item.pid,
                            unit_amount: {
                                "currency_code": "USD",
                                "value": item.price
                              },
                            quantity: item.quantity,
                        }
                    });
                    setitems(tempitems)
                }
            });
          } catch(error) {
            //console.log(error)
          }
    }

    const createOrder = async (data, actions) => {
        console.log(items);
        return actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: totalAmount,
                                breakdown: {
                                    item_total: {  /* Required when including the `items` array */
                                      currency_code: "USD",
                                      value: totalAmount
                                    }
                                  }
                            },
                            custom_id: customID,
                            invoice_id: invoiceID,
                            items: items,
                        },
                    ],
                    application_context: {
                        shipping_preference: "NO_SHIPPING",
                    },
                })
                .then((orderID) => {
                    //console.log(orderID);
                    return orderID;
                });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
            clearCartItem(dispatch);
        });
    };

    return (
    <div className='ShoppingList'>
        <p>Shopping List (${totalAmount})</p>
        <div className='ShoppingList-hide'>
            <Card>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                <div className='ShoppingList-title'>Shopping List (Total ${totalAmount})</div>
                            </Col>
                        </Row>
                        {cartItems.map((item) => {
                            return (
                            <Row key={item.pid}>
                                <Col xs='6'>{item.name}</Col>
                                <Col><Form.Control type="text" placeholder={item.quantity} onChange={(event)=>{
                                    changeCartHandler(event.target.value, item.pid)
                                }}/></Col>
                                <Col>${item.price}</Col>
                            </Row>)
                            })
                        }
                        {/* <div className='ShoppingList-checkout'>
                            <Button variant="dark" onClick={testHandler}>Checkout</Button>
                        </div> */}
                        <form>
                            <div>
                                <Button variant="dark" onClick={orderHandler}>Checkout with Paypal</Button>
                            </div>
                            <input type="hidden" name="csrf-nonce" value={csrfNonce}></input>
                        </form>
                        <PayButton/>
                        {Warning}
                    </Container>
                </Card.Body>
            </Card>
        </div>
    </div>
    )
}