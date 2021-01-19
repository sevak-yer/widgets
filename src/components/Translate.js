import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
    {
        label: 'Persian',
        value: 'fa'
    },
    {
        label: 'Arabic',
        value: 'Ar'
    },
    {
        label: 'Hindi',
        value: 'hi'
    },
    {
        label: 'Armenian',
        value: 'hy'
    }
]

const Translate = () => {
    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState();

    return (
        <div>
            <div className='ui form' >
                <div className='field'>
                    <label>
                        Enter text
                    </label>
                    <input vale={text} onChange={(event) => { setText(event.target.value) }}></input>
                </div>
            </div>
            <br />
            <Dropdown label='Select a language' selected={language} onSelectedChange={setLanguage} options={options} />
            <hr />
            <h3 className='ui header'>Output</h3>
            <Convert language={language} text={text} />
        </div>
    )
}

export default Translate;