import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ storeData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const names = storeData.map(store => store.storeName);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = names.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleItemClick = (item) => {
    setSearchQuery(item);
    setFilteredData([]);
  };

  return (
    <div className='search-bar-container'>
      <input
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
        placeholder='Search for a Dispensary...'
      />
 
      {searchQuery && filteredData.length > 0 && (
        <ul className='suggestions-container'>
          {filteredData.map((item, index) => {
            const store = storeData.find(s => s.storeName.toLowerCase() === item.toLowerCase());
            if (store) {
              return (
                <div className="suggestion-inner-container" onClick={() => handleItemClick(store.storeName)} key={index}>
                  <Link to={`/store/${store.storeName}`}>
                    <div className='suggestion'>
                      <img src={store.image} alt={store.storeName} />
                      <div className="suggestion-details">
                        <span>{store.storeName}</span>
                        <span>{store.location}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
