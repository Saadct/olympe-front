import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './event';
import './event-list.css';

const EventListCard = () => {
  const [events, setEvents] = useState([]);

  const [categories, setCategories] = useState([]);

  const [startIndexCat, setStartIndexCat] = useState(0);
  const [itemsPerPageCat, setItemsPerPageCat] = useState(4); 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [categoryId, setCategory] = useState(''); 
  const [isFiltered, setFilter] = useState(false) 


    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchEventsPaginated = async (page, size) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/evenements/paginated/${page}/${size}`);
        const eventData = response.data[0]; 
        const totalPage = response.data[1]; 
        setTotalPages(totalPage)
        setEvents(eventData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEventsPaginated(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    fetchCategories();
  }, []);


  const handleCategoryClick = async (uuid, page, size) => {
    setCurrentPage(0);
    setCategory(uuid);
    setFilter(true);
    console.log(categories);
    console.log(uuid);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/evenements/paginatedByCategory/${page}/${size}/${uuid}`);
  
      const eventData = response.data[0]; 
      const totalPage = response.data[1]; 
      setTotalPages(totalPage);
      setEvents(eventData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let buttonsPerPage;
  
      if (windowWidth >= 1600) {
        buttonsPerPage = 16;
      }
      if (windowWidth >= 1200) {
        buttonsPerPage = 14;
      } else if (windowWidth >= 800) {
        buttonsPerPage = 10;
      }
      else if (windowWidth >= 800) {
            buttonsPerPage = 6;
      }
      else if (windowWidth >= 550) {
        buttonsPerPage = 5;
      } 
      else if (windowWidth >= 300) {
        buttonsPerPage = 3;
      } else {
        buttonsPerPage = 2; 
      }
  
      setItemsPerPageCat(buttonsPerPage);
    };    
  
    window.addEventListener('resize', handleResize);
    handleResize(); 
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const nextPage = async () => {
    if (currentPage < totalPages - 1) { 
      if(isFiltered === false){
        await changeItemsPerPageEventCard(currentPage + 1, itemsPerPage);
      }else{
        await handleCategoryClick(categoryId, currentPage + 1, itemsPerPage);
      }
      setCurrentPage(currentPage + 1);
    }
  };
  
  const previousPage = async () => {
    if (currentPage > 0) {
      if(isFiltered === false){
      await changeItemsPerPageEventCard(currentPage - 1, itemsPerPage);
      }
      else{
        await handleCategoryClick(categoryId, currentPage - 1, itemsPerPage);
      }
      setCurrentPage(currentPage - 1);
    }
  };
  

  const handlePrevCatClick = () => {
    setStartIndexCat((prevIndex) => Math.max(prevIndex - itemsPerPageCat, 0));
  };

  const handleNextCatClick = () => {
    setStartIndexCat((prevIndex) => Math.min(prevIndex + itemsPerPageCat, categories.length - itemsPerPageCat));
  };

  
  const changeItemsPerPageEventCard = async (page, number) => {
    try {
      setCategory('');
      setFilter(false);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/evenements/paginated/${page}/${number}`);
      const eventData = response.data[0];
      const totalPage = response.data[1]; 
    
      setTotalPages(totalPage)
      setEvents(eventData);
      setItemsPerPage(number);
    } catch (err) {
      console.log(err);
    }
  };
  


  return (
    <div style={{minHeight:"800px"}}>
      <div className="category-filters">
      <button className="category-button" onClick={() => changeItemsPerPageEventCard(0, itemsPerPage) }>aucun filtre</button> 
        <div className="category-buttons">

          {categories.slice(startIndexCat, startIndexCat + itemsPerPageCat).map((category) => (
            <button
              key={category.uuid}
              onClick={() => handleCategoryClick( category.uuid, 0, itemsPerPage)}
              className="category-button"
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="pagination-buttons">
          <button onClick={handlePrevCatClick} disabled={currentPage > 0} className="buttonPagination">
            &lt;
          </button>
          <button onClick={handleNextCatClick} disabled={startIndexCat >= categories.length - itemsPerPageCat} className="buttonPagination">
            &gt;
          </button>
        </div>
      </div>

      <div className="pagination-buttons centered-button">
        <div>
  {totalPages > 2 && <button onClick={() => changeItemsPerPageEventCard(0, 20)} className="buttonItem">20</button>}
  {totalPages > 3 && <button onClick={() => changeItemsPerPageEventCard(0, 30)} className="buttonItem">30</button>}
  {totalPages > 5 && <button onClick={() => changeItemsPerPageEventCard(0, 60)} className="buttonItem">60</button>}
  {totalPages > 10 && <button onClick={() => changeItemsPerPageEventCard(0, 120)} className="buttonItem">120</button>}
</div>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event.name} event={event} />
        ))}
      </div>
      <div className="pagination-manage">
      <div className="pagination-buttons centered-button">
  <div>
    {currentPage + 1} / {totalPages} 
  </div>
</div>
      <div className="pagination-buttons centered-button">
          <button onClick={previousPage} disabled={currentPage === 0} className="buttonPagination">
            &lt;
          </button>
          <button onClick={nextPage} 
           disabled={currentPage === totalPages} 
           className="buttonPagination">
            &gt;
          </button>
        </div>
        </div>
    </div>
  );
};

export default EventListCard;