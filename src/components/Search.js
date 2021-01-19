import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);
    const [debouncedTerm, setDebauncedTerm] = useState(term)

    const renderedResults = results.map((res) => {
        let tempSnippet = res.snippet;
        tempSnippet = tempSnippet.replaceAll('<span class="searchmatch">', '');
        tempSnippet = tempSnippet.replaceAll('</span>', '')
        return (
            <div key={res.pageid} className='item'>
                <div className='right floated content'>
                    <a
                        className='ui button'
                        href={`https://en.wikipedia.org?curid=${res.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className='content'>
                    <div className='header'>
                        {res.title}
                    </div>
                    {tempSnippet}
                </div>
            </div>
        )
    })

    const onSearchInput = (term) => {
        setTerm(term.target.value)
    }

    //useEffect is used instead of life sycle methods in class based components
    //if the second argument is an empty array the first function argument in useEffect will run at initial render
    //if we provide no second argument, the first function argumnent will run after initial and every other render
    //and finally if we provide the second argment as an array with some value inside it, the first argument will run
    //after initial render and after every other render if data has changed since the last render 
    //in useEffect we are not allowed to use async directly on the arrow function passed as the first argument
    //you can return a function in use effect to be invoked next time useEffect is called, like clearTimeout(timeoutId) below
    // useEffect(() => {
    //     const search = async ()=> {
    //         if (term) {
    //             const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
    //                 params: {
    //                     action: 'query',
    //                     list: 'search',
    //                     origin: '*',    
    //                     format: 'json',
    //                     srsearch: term
    //                 }
    //             })
    //             setResults(data.query.search)
    //         }     
    //     } 
    //     if (term && !results.length) {
    //         search() 
    //     } else {
    //         const timeoutId = setTimeout(() => {
    //             search()  
    //         }, 500);
    //         return ()=>{
    //             clearTimeout(timeoutId)
    //         }
    //     }

    // if we use any piece of state inside useEffect then we need to add it in the use effect second argument array
    //like we added results.length below, else we get the following warning message in the console:
    //Line 72:7:  React Hook useEffect has a missing dependency: 'results.length'. Either include it or remove the 
    //dependency array  react-hooks/exhaustive-deps
    //however by doing so we make useEffect to run for the second time because the result.length is changed and as we know 
    //useEffect will be called whenever the state piece listed in the second argument is changed
    //but we do not want this to happen, so instead of writing this useEffect, we will implement two new useEffects as below

    // },[term, results.length])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebauncedTerm(term)
        }, 500);

        return () => {
            clearInterval(timeoutId)
        };

    }, [term])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            })
            setResults(data.query.search)
        }
        search()
    }, [debouncedTerm])

    return (
        <div>
            <div className='ui form'>
                <div className='field'>
                    <label>
                        Enter Search term
                    </label>
                    <input className='input' value={term} onChange={onSearchInput} />
                </div>
            </div>
            <div className='ui celled list'>{renderedResults}</div>
        </div>
    )
}

export default Search;