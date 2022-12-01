import {useState, useEffect} from 'react';

function getWindowsPathname() {
    const {location: pathname} = window;
    return {
        pathname
    };
}


export default function useWindowsLocations () {
    const [getLocation, setLocation] = useState(getWindowsPathname());

    useEffect(() => {

        function getLocationDetails(){
            setLocation(window.location.pathname);
        }

        window.addEventListener('location', getLocationDetails)
    }, []);

    return getLocation;
}


