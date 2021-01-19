import React, { useState } from 'react';

const Accordion = (props) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null)
        } else {
            setActiveIndex(index)
        }
    }

    const renderedItems = props.items.map((item, index) => {
        const active = activeIndex === index ? 'active' : '';


        //react.Fragment is instead of a div element and it is a containing jsx element that does not show up when
        //react renders the jsx block. if otherwise we had used div element, it would be part of the jsx and would be 
        //rendered. if we want to have the div as container but does not want to have it in the resulting rendered block
        //then we use react.Fragment instead.
        return <React.Fragment key={item.title}>
            <div className={`title ${active}`} onClick={() => { onTitleClick(index) }}>
                <i className='dropdown icon'>
                </i>
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <p>{item.content}</p>
            </div>
        </React.Fragment>
    })

    return <div className='ui styled accordion'>
        {renderedItems}
    </div>
}

export default Accordion;