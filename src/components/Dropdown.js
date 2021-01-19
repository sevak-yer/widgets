import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {

    const [open, setOpen] = useState(false);

    const ref = useRef()

    //whenever we remove a component from the dom like Dropdown, all the refs attached to elements inside that component 
    //get set to null, ref.current property get set to null, because we do not have the element to reffer to
    //so we get error on ref.current.contains(event.target) because ref.current is null
    //however we still have the document.body.addEventListener set up  
    //so whenever we remove the component from the dom we need to turn off the document.body.addEventListenerset
    //to do so we will use the cleanup function that we can return from useEffect, and it will be called right before the
    //next time useEffect is called. The other senario that this returned function will be called is when we are about to
    //stop showing the entire component. So in our case we want to detach addEventListener from the body.(line 35)
    //the other way instead of using the return function is to check if ref.current is true (line 27)
    useEffect(() => {
        const onBodyClick = (event) => {
            //I used event.target ids to access the elements like below
            // if (!(event.target.id==='1' || event.target.id==='2')) {
            //     setOpen(false);
            // } 
            //other way is to use useRef() and assign it to the most upper element in dropdown
            //then check if it contains the event.target in it, like below

            //if (ref.current && !ref.current.contains(event.target)) {
            if (!ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        //when we use addEventListener, it gets called first before any react event listener gets called
        document.body.addEventListener('click', onBodyClick, true)
        return () => {
            document.body.removeEventListener('click', onBodyClick, true);
        }
    }, [])

    const renderedOptions = options.map((option) => {
        if (option.value !== selected.value) {
            return <div id={2} key={option.value} className='item' onClick={() => { onSelectedChange(option) }}>
                {option.label}
            </div>
        } else {
            return null
        }
    })

    return (
        <div className='ui form' ref={ref}>
            <div className='field'>
                {/* <label className='label'>Select a Color</label> */}
                <label className='label'>{label}</label>
                <div
                    onClick={() => { setOpen(!open) }}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className='dropdown icon'></i>
                    <div id={1} className='text'>{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown; 