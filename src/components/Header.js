import React from 'react';
import Link from './Link'

export default () => {
    //the downside in using this <a> links is every time we click on a link, all the html, css and js files gets 
    //reloaded causing unnecessary network trafic, because on the first load of the page we got all the files already 
    // the other way is to use Link component, see the Link property
    return (
        <div className='ui secondary pointiong menu'>
            {/* <a href='/' className='item'>Accordion</a>
            <a href='/list' className='item'>Search</a>
            <a href='/translate' className='item'>Translate</a>
            <a href='/dropdown' className='item'>Dropdown</a> */}
            <Link href='/' className='item'>Accordion</Link>
            <Link href='/list' className='item'>Search</Link>
            <Link href='/translate' className='item'>Translate</Link>
            <Link href='/dropdown' className='item'>Dropdown</Link>
        </div>
    )
}