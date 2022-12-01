import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({
    overAllData,
    setPageDetails,
    rowsPerPage,
    paginationIndex,
}) => {
    const handlePagination = (event, page) => {
        if (page === 1) {
            setPageDetails(0);
        } else if (page > 1) {
            setPageDetails(page - 1);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Paper>
            <Pagination
                onChange={handlePagination}
                count={Math.floor(overAllData / rowsPerPage)}
                boundaryCount={1}
                variant="outlined"
                defaultPage={paginationIndex}
                shape="rounded"
                disabled={overAllData < 10 ? true : false}
            />
        </Paper>
    );
};

export default PaginationComponent;
