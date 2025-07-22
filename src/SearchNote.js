import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Card.css';

const SearchNote = (props) => {
    const [searchPhrase, setSearchPhrase] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        props.onSearch(searchPhrase, navigate);
    };

    const updateSearchPhrase = (event) => {
        setSearchPhrase(event.target.value);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setSearchPhrase('');

        props.onSearch('', navigate);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label for="content">Content</label>
                <input type="text" className="form-control" id="content" placeholder="Enter Search Phrase" onChange={updateSearchPhrase} value={searchPhrase} />
            </div>
            <div className="d-flex flex-row">
                <div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
                <div className="spacer"></div>
                <div>
                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
}

export default SearchNote;