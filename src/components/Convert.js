import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState();
    const [debauncdText, setDebauncedText] = useState()

    useEffect(() => {
        const TimedoutId = setTimeout(() => {
            setDebauncedText(text)
        }, 500);
        return () => {
            clearInterval(TimedoutId)
        }
    }, [text])

    useEffect(() => {
        if (debauncdText) {
            const doTranslation = async () => {
                const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                    params: {
                        target: language.value,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
                        q: debauncdText
                    }
                })
                setTranslated(response.data.data.translations[0].translatedText)
            }
            doTranslation()
        }
    }, [language, debauncdText])

    return (
        <div>
            <h1 className='ui header'>{translated}</h1>
        </div>
    )
}

export default Convert