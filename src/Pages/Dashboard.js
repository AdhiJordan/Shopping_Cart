import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductListing from '../Components/ProductListing';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SortBySelect from '../Components/SortBySelect';
import filterOptions from './../Static/filtersOptions.json';
import Loaders from '../Components/Loaders';
import Button from 'react-bootstrap/Button';
import { connect, useDispatch } from 'react-redux';
import headerDetails from './../Static/headers.json';
import Header from '../Components/Header';
import { useHistory, Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = ({ launchDetails }) => {
    const history = useHistory();
    const [defaultProductList, setDefaultProductList] = useState([]);
    const [getProductDetails, setProductDetails] = useState([]);
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

    const getInitialProductData = () => {
        axios.get(`https://fakestoreapi.com/products`).then((response) => {
            if (response) {
                console.log(response);
                setLaunchCount(response.data.length);
                setProductDetails(response.data);
                setDefaultProductList(response.data);
            }
        });
    };

    useEffect(() => {
        getInitialProductData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getUserSelectedValue = (data) => {
        setProductDetails([]);
        let queryUrl = {
            order: 'desc',
        };
        let sortedProduct;
        if (data === 'Sort By Lower to Higher') {
            queryUrl['order'] = 'asc';
            sortedProduct = defaultProductList.sort(function (a, b) {
                return a.price - b.price;
            });
        } else if (data === 'Sort By Higher to Lower') {
            queryUrl['order'] = 'desc';
            sortedProduct = defaultProductList.sort(function (a, b) {
                return b.price - a.price;
            });
        }

        setQueryFilters((queryFilters) => ({
            ...queryFilters,
            order: queryUrl.order,
        }));
        setProductDetails(sortedProduct);
    };

    const resetFilters = () => {
        setProductDetails([]);
        getInitialProductData();
    };

    return (
        <div>
            <div className="margin-bottom-30">
                <Header />
                <br />
                <hr />
                <div className="margin-bottom-30">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <SortBySelect
                                    sortByOptions={filterOptions}
                                    userSelectedValue={getUserSelectedValue}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1}>
                                <div className="resetButton">
                                    <Button
                                        onClick={() => resetFilters()}
                                        variant="primary"
                                        className="margin-r-10"
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
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
                            {getProductDetails &&
                            getProductDetails.length > 0 ? (
                                <ProductListing
                                    setTitle="Launch"
                                    setTableName="Overview"
                                    launchCount={launchCount}
                                    setHeaders={headerDetails}
                                    getProductData={getProductDetails}
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
                                        No results found for this specified
                                        filter!
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
        launchDetails: state.launchDetails,
    };
};

export default connect(mapStateToProps)(Dashboard);
