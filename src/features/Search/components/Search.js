import React from 'react'
import { useSelector } from 'react-redux'
import { SingleItem } from '../../Dashboard/components/SingleItem'
import { useEffect } from 'react';
import "../../../Styles/Search.css"

export const Search = () => {
    const { searchResults } = useSelector((state) => state.movies)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="bgGrey" >
            <h2 className="heading">
                Search Results
            </h2>
            <div className="list-container">
                {
                    searchResults?.map((item, i) =>
                        <SingleItem applyClass="listItem" item={item} />)
                }
            </div>

        </div >)
}
