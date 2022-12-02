import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductListing from '../../Components/ProductListing';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SortBySelect from '../../Components/SortBySelect';
import Loaders from '../../Components/Loaders';
import { connect, useDispatch } from 'react-redux';
import Header from '../../Components/Header';
import { useHistory, Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CartPage = ({ userDetails, cartDetails }) => {
    const history = useHistory();
    const [getCartDetails, setCartDetails] = useState([]);
    const [getCartProductDetails, setCartProductDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [launchCount, setLaunchCount] = useState(0);
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [order, setOrder] = useState('DESC');
    const [emptyLaunchList, setEmptyLaunchList] = useState(false);
    const [queryFilters, setQueryFilters] = useState({
        limit: 5,
        offset: 0,
        launch_success: '',
        launch_type: '',
        launchStartDateFilter: '',
        launchEndDateFilter: '',
    });

    const dispatch = useDispatch();

    const getProductDetails = (productId) => {
        axios
            .get(`https://fakestoreapi.com/products/` + productId)
            .then((response) => {
                if (response) {
                    console.log(response);
                    return response;
                }
            });
    };

    useEffect(() => {
        if (cartDetails) {
            setCartProductDetails(cartDetails.cartList);
            let totalAmount = cartDetails.cartList.reduce(
                (n, { price }) => n + price,
                0
            );
            setTotalPrice(totalAmount);
        } else if (cartDetails.carList.length === 0) {
            setCartProductDetails([]);
            setEmptyLaunchList(true);
            setTotalPrice(0);
        }
    }, [cartDetails]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className="margin-bottom-30">
                <Header />
                <br />
                <hr />
                <p className="text-right margin-r-30">
                    Total Price Amount: <b>{totalPrice}</b>
                </p>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={10}
                            lg={10}
                            className="gridBox"
                        >
                            {getCartProductDetails.length > 0 ? (
                                <ProductListing
                                    setTitle="Launch"
                                    setTableName="Overview"
                                    launchCount={launchCount}
                                    getProductData={getCartProductDetails}
                                    //setPaginationIndex={getPageIndex}
                                    paginationIndex={paginationIndex}
                                />
                            ) : emptyLaunchList ? (
                                <>
                                    <h2 className="padding-20 text-center">
                                        <img
                                            src="/assets/images/NoDataFound.svg"
                                            alt="Not found"
                                            className="margin-b-30"
                                        />{' '}
                                        <br />
                                        No Product in Cart found !
                                    </h2>
                                </>
                            ) : (
                                <div className="flex-center">
                                    <Loaders />
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
        cartDetails: state.cartDetails,
    };
};

export default connect(mapStateToProps)(CartPage);
