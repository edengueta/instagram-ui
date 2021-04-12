import React, { useEffect, useState } from 'react';
import { UserService } from '../services/user.service';
import "./Search.scss"
import SearchResult from './SearchResult/SearchResult';

function Search() {

    const [query,setQuery]=useState('');
    const [result,setResult]=useState([]);

    useEffect(()=> {
        if (!query) {
            setResult ([]);
            return;
        }

        async function getUser() {
            try{
                setResult( await UserService.search(query) )
    
            }catch(err){
                console.log(err)
            }
        }
        getUser();
    }, [query]);
    

    function headlinGenerator() {
        if (result.length===0 && query) {
            return <h1>Results for: {query}</h1>
        } else if(result.length===0 && query.length > 0) {
            return <h1>No results for: {query}</h1>
        } else return
    }


    return (
        <div className="Search">
            <input autoFocus placeholder="Type name..." className="search-input" onChange={(e)=> setQuery(e.target.value)}/>
            { headlinGenerator() }
            <div className="results">
                { result.map (user => ( <SearchResult key={user._id} data={user}/> )) }
            </div>

        </div>


    );
}

export default Search;