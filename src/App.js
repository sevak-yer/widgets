import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search.js';
import Dropdown from './components/Dropdown'
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: 'What is React?',
        content: 'React is a front end javascript framework'
    },
    {
        title: 'Why use react?',
        content: 'React is a favorite javascript library among engineers.'
    },
    {
        title: 'How do you use react?',
        content: 'You use react by creating components.'
    }
];

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
]



export default () => {
    const [selected, setSelected] = useState(options[0]);   //this is used for Dropdown component
    const [showDropdown, setShowDropdown] = useState(true);   //this is used for Dropdown component

    // const showComponent = () => {
    //     if (window.location.pathname==='/') {
    //         return <Accordion items={items}/>
    //     }
    //     if (window.location.pathname==='/list'){
    //         return <Search/>
    //     }
    //     if (window.location.pathname==='/dropdown'){
    //         return (<Dropdown
    //         label='Sellect a color'
    //         selected={selected}
    //         onSelectedChange={setSelected}
    //         options={options}
    //     />)
    //     }
    //     if (window.location.pathname==='/translate'){
    //         return <Translate/>
    //     }
    // }

    return <div>
        {/* <button onClick={() => { setShowDropdown(!showDropdown) }}>toggle dropdown</button> */}
        {/* <Accordion items={items}/> */}
        {/* <Search/> */}
        {/* {showDropdown ?      ////this is used for Dropdown component
            <Dropdown
                label='Sellect a color'
                selected={selected}
                onSelectedChange={setSelected}
                options={options}
            />
            : null
        } */}
        {/* <Translate /> */}
        {/* {showComponent()} */}
        <Header/>
        <Route path='/'>
            <Accordion items={items} />
        </Route>
        <Route path='/list'>
            <Search />
        </Route>
        <Route path='/dropdown'>
            <Dropdown
                label='Sellect a color'
                selected={selected}
                onSelectedChange={setSelected}
                options={options}
            />
        </Route>
        <Route path='/translate'>
            <Translate />
        </Route>
    </div>
}