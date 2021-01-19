import React from 'react';

export default ({className, href, children}) => {

    const onClick = (event) => {
        //we want to open a new tab when we hold the control key while clicking
        //we check if the control key in windows or meta key in mac os are pressed when the click happened
        //if true we want the default behaviour of the event, and do not want all the code in this onClick callback function
        //to execute, because we need to download all the files in the browser new tab, so we return early
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        //here we prevent the default behavior of the event which is to reload the entire page
        //then by using window.history.pushState we change the url without reloading the page
        event.preventDefault();
        window.history.pushState({}, '', href)
        //the following code will comunicate to the route component that the url has just changed
        // by emiting a synthetic event popstate then to listen to that event go to Route component
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return <a onClick={onClick} className={className} href={href}>{children}</a>
}