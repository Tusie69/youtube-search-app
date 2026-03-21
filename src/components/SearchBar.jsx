import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <div className="search-wrap">
            <form onSubmit={handleSubmit} className="search-form">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Tìm kiếm video trên YouTube..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Tìm
                </button>
            </form>
        </div>
    );
};

export default SearchBar;