import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./RickMortyApi.jsx.css"

const RickMortyApi = () => {

    const [list, setList] = useState()

    useEffect(() => {
        ApiCalling();
    }, [])

    function ApiCalling() {
        axios.get("https://rickandmortyapi.com/api")
            .then((res) => {

                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>RickMortyApi</h1>
            {/* {list && (
                <div className='card'>
                    <img src={list.image} alt={list.name} width="100%" />
                    <h3>{list.name}</h3>
                    <p>Status: {list.status}</p>
                    <p>Species: {list.species}</p>
                </div>
            )} */}
        </div>
    )
}

export default RickMortyApi


/* ------------------------ fetch method ---------------------------------- 

import React, { useEffect, useState } from 'react'
import "./RickMortyApi.jsx.css"

const RickMortyApi = () => {

    const [list, setList] = useState(null)

    useEffect(() => {
        apiCalling()
    }, [])

    async function apiCalling() {
        try {
            const response = await fetch("https://rickandmortyapi.com/api")
            const data = await response.json()
            console.log(data)
            setList(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>RickMortyApi</h1>

            {list && (
                <div className='card'>
                    <img src={list.image} alt={list.name} width="100%" />
                    <h3>{list.name}</h3>
                    <p>Status: {list.status}</p>
                    <p>Species: {list.species}</p>
                </div>
            )}
        </div>
    )
}

export default RickMortyApi

*/