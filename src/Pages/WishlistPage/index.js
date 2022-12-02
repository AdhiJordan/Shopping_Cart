import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductListing from '../../Components/ProductListing';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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

const WishlistPage = ({ userDetails, wishListDetails }) => {
    const history = useHistory();
    const [getWishlistProductDetails, setWishlistProductDetails] = useState([]);
    const [launchCount, setLaunchCount] = useState(0);
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [order, setOrder] = useState('DESC');
    const [emptyLaunchList, setEmptyLaunchList] = useState(false);

    useEffect(() => {
        if (wishListDetails) {
            setWishlistProductDetails(wishListDetails.wishList);
        } else if (wishListDetails.wishList.length === 0) {
            setWishlistProductDetails([]);
            setEmptyLaunchList(true);
        }
    }, [wishListDetails]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className="margin-bottom-30">
                <Header />
                <br />
                <hr />

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
                            {getWishlistProductDetails.length > 0 ? (
                                <ProductListing
                                    setTitle="Launch"
                                    setTableName="Overview"
                                    launchCount={launchCount}
                                    getProductData={getWishlistProductDetails}
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
        wishListDetails: state.wishListDetails,
    };
};

export default connect(mapStateToProps)(WishlistPage);
