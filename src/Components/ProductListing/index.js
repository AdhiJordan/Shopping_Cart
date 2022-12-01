import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import Card from '../Card';
import Launch from './Launch';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ToastMessage from './../ToastMessage';

const ProductListing = ({
    setTitle,
    setTableName,
    setHeaders,
    getProductData,
    launchCount,
    setPaginationIndex,
    paginationIndex,
}) => {
    const [rowDetails, setRowDetails] = useState([]);
    const [overallData, setOverallData] = useState(getProductData.length);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);
    const [toggleToast, setToggleToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(false);
    const [toastType, setToastType] = useState();

    const getPageDetails = (data) => {
        setPage(data);
        setPaginationIndex(data);
    };

    useEffect(() => {
        setRowDetails(getProductData);
        setOverallData(getProductData.length);
    }, [getProductData]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const setProductToCart = () => {};

    const setProductToFavourites = () => {};

    console.log('getProductData', getProductData);

    return (
        <div className="margin-t-30">
            {toggleToast && (
                <ToastMessage
                    type={toastType}
                    message={toastMessage}
                    backToInitialState={() => setToggleToast(false)}
                />
            )}
            <div className="padding-10">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4}>
                        {(rowsPerPage > 0 && getProductData
                            ? getProductData.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : getProductData
                        ).map((data, index) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                    key={index}
                                >
                                    <Card
                                        productId={index}
                                        productName={data.title}
                                        productImage={data.image}
                                        productPrice={data.price}
                                        productCategory={data.category}
                                        addToCart={setProductToCart}
                                        addToFavourites={setProductToFavourites}
                                        productQuantity={data.productQuantity}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </div>
            <div className="margin-top-30 float-right">
                {launchCount > 0 && (
                    <Pagination
                        overAllData={launchCount}
                        setPageDetails={getPageDetails}
                        rowsPerPage={rowsPerPage}
                        paginationIndex={paginationIndex}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductListing;
