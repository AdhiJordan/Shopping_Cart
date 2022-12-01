import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import ToastMessage from './../ToastMessage';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartAction, deleteTodoList } from '../../store/actions/cart';
import {
    addToWishlistAction,
    deleteWishListAction,
} from '../../store/actions/wishlist';

const Card = ({
    productId,
    productName,
    productImage,
    productPrice,
    productCategory,
    addToCart,
    addToFavourites,
    productQuantity,
    userDetails,
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const [toggleToast, setToggleToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(false);
    const [toastType, setToastType] = useState();
    const [toggleAction, setToggleAction] = useState(false);

    const quantityCount = (data) => {
        if (data === 'increment') {
            setQuantity(quantity + 1);
        } else if (data === 'decrement' && quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const productAddedToCart = () => {
        let productWrap = {
            userId: 1,
            date: new Date(),
            productId: productId,
            productQuantity: quantity,
            image: productImage,
            title: productName,
            price: productPrice,
        };

        axios
            .post('https://fakestoreapi.com/carts', {
                body: JSON.stringify(productWrap),
            })
            .then((response) => {
                console.log('$$$$$', response);
                if (response.status === 200) {
                    setToastMessage('Product Added to cart Successfully');
                    setToastType('success');
                    setToggleToast(true);
                }
            });
        dispatch(addToCartAction(productWrap));
    };

    const updateProductCart = () => {};

    const deleteProductCart = (id) => {
        dispatch(deleteTodoList(id));
    };

    const deleteProductWishlist = (id) => {
        dispatch(deleteWishListAction(id));
    };

    const productAddedToWishlist = () => {
        let productWrap = {
            userId: 1,
            date: new Date(),
            productId: productId,
            productQuantity: quantity,
            image: productImage,
            title: productName,
            price: productPrice,
        };

        axios
            .post('https://fakestoreapi.com/carts', {
                body: JSON.stringify(productWrap),
            })
            .then((response) => {
                console.log('$$$$$', response);
                if (response.status === 200) {
                    setToastMessage('Product Added To Wishlist');
                    setToastType('success');
                    setToggleToast(true);
                }
            });
        dispatch(addToWishlistAction(productWrap));
    };

    useEffect(() => {
        if (
            window.location.pathname === '/cart' ||
            window.location.pathname === '/wishlist'
        ) {
            setToggleAction(true);
        }
    }, []);

    return (
        <div>
            {toggleToast && (
                <ToastMessage
                    type={toastType}
                    message={toastMessage}
                    backToInitialState={() => setToggleToast(false)}
                />
            )}
            <Paper key={productId} className="paperCls">
                <img
                    src={productImage}
                    width="100%"
                    alt={productName}
                    height="300"
                    className="image-contain"
                />
                <h4>Name: </h4>
                <p className="table-col t-heading">{productName}</p>
                <h4>Price: </h4>
                <p className="table-col t-heading">{productPrice}</p>
                <h4>Category: </h4>
                <p className="table-col t-heading">{productCategory}</p>

                {userDetails && userDetails.userDetails && (
                    <>
                        {/* <h4>Quantity: {quantity}</h4> */}
                        {!toggleAction ? (
                            <>
                                {/* <input type="number" value={quantity} min={1} /> */}
                                {/* <Button
                                    variant="primary"
                                    onClick={() => quantityCount('increment')}
                                >
                                    +
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => quantityCount('decrement')}
                                >
                                    -
                                </Button>{' '} */}
                                <br /> <br />
                                <Button
                                    variant="primary"
                                    onClick={() => productAddedToCart()}
                                >
                                    Add to Cart
                                </Button>{' '}
                                <br /> <br />
                                <Button
                                    variant="primary"
                                    onClick={() => productAddedToWishlist()}
                                >
                                    Add to Favourites
                                </Button>
                            </>
                        ) : (
                            <>
                                <br />
                                {window.location.pathname === '/wishlist' ? (
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            deleteProductWishlist(productId)
                                        }
                                    >
                                        Delete Product
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            deleteProductCart(productId)
                                        }
                                    >
                                        Delete Product
                                    </Button>
                                )}
                            </>
                        )}
                    </>
                )}
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userDetails: state.userDetails,
});

export default connect(mapStateToProps)(Card);
