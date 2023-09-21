/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from 'react';
import imageData from './ImageData'; 
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      try {
        setImages(imageData);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while loading images.');
        setLoading(false);
      }
    }, 2000);
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredImages = images
    .filter((image) =>
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (image) => {
    dragItem.current = image;
  };

  const handleDragEnter = (image) => {
    dragOverItem.current = image;
  };

  const handleDragEnd = () => {
    if (dragItem.current && dragOverItem.current) {
      const updatedImages = [...images];
      const draggedIndex = updatedImages.indexOf(dragItem.current);
      const dropIndex = updatedImages.indexOf(dragOverItem.current);

      if (draggedIndex !== -1 && dropIndex !== -1) {
        updatedImages.splice(draggedIndex, 1);
        updatedImages.splice(dropIndex, 0, dragItem.current);
        setImages(updatedImages); 
      }
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };
  const handleNavigateToOtherPage = () => {
    navigate('/');
  };


  return (
    <div className="gallery">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Gallery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="inputTag"
        />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : filteredImages.length === 0 ? (
        <div className="no-results">No results found.</div>
      ) : (
        <div className="gallery-items">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              draggable
              onDragStart={() => handleDragStart(image)}
              onDragEnter={() => handleDragEnter(image)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                src={image.url}
                alt={`Image ${image.id} - ${image.tags.join(', ')}`}
              />
              <div className="tags">
                {image.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {currentPage === 3 && (
        <button onClick={handleNavigateToOtherPage}>Next</button>
      )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
