import React, { useState } from 'react';
import Dashboard from './Dashboard';
import WishlistPage from './WishlistPage';
import CartPage from './CartPage';
import useWindowsPathname from './../Components/WindowPathname';

const HomePage = (props) => {
    const [getPathUrl] = useState(useWindowsPathname()); //useWindowsPathname()

    return (
        <div>
            <main>
                {(() => {
                    switch (getPathUrl.pathname.pathname) {
                        case '/dashboard':
                            return <Dashboard />;
                        case '/cart':
                            return <CartPage />;
                        case '/wishlist':
                            return <WishlistPage />;
                        default:
                            return <Dashboard />;
                    }
                })()}
            </main>
        </div>
    );
};

export default HomePage;
