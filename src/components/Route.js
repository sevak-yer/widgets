import {useEffect, useState} from 'react'
//here we listen to the synthetic popstate event created in Link component, we listen to the event in useEffect
//because we want to start listening to that event one time when the component renders for the first time
export default ({ path, children }) => {
    //we add current path soley for the purpose of the path component to rerender itself after listening to the event
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    useEffect(()=> {    
        const onLocationChange=() => {
            setCurrentPath(window.location.pathname);
        }
        window.addEventListener('popstate', onLocationChange)
        //if we ever decide to stop showing the route component on the screen we would want to make sure that we 
        //clean up the event listener, so we return a clean up function, like below
        return () => {
            window.removeEventListener('popstate', onLocationChange)
        }
    }, [])

    return currentPath === path ? children : null;
}