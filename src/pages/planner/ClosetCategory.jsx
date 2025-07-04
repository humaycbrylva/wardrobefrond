import React, { useState, useEffect, useRef } from 'react';
import axios from '../../services/axiosInstance';
import styles from './ClosetCategory.module.css';

const ClosetCategory = ({ onSelectItem }) => {
  const [categories, setCategories] = useState([]);
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchCloset() {
      try {
        const res = await axios.get('/closet'); 
        const grouped = res.data.reduce((acc, item) => {
          (acc[item.category] = acc[item.category] || []).push(item);
          return acc;
        }, {});
        setItemsByCategory(grouped);
        const cats = Object.keys(grouped);
        setCategories(cats);
        setSelectedCategory(cats[0] || '');
      } catch (err) {
        console.error('Closet alınmadı:', err);
      }
    }
    fetchCloset();
  }, []);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 150;
    if (direction === 'left') {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Kateqoriya düymələri */}
      <div className={styles.container}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.categoryButton} ${selectedCategory === cat ? styles.selected : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scroll düymələri və məhsullar */}
      <div className={styles.scrollWrapper}>
        <button
          onClick={() => scroll('left')}
          className={`${styles.scrollButton} ${styles.left}`}
          aria-label="Scroll Left"
        >
          ‹
        </button>

        <div
          ref={scrollContainerRef}
          className={styles.itemsContainer}
        >
          {(itemsByCategory[selectedCategory] || []).map(item => (
            <div
              key={item._id}
              onClick={() => onSelectItem(item)}
              className={styles.itemCard}
            >
              <img
                src={`http://localhost:5000/closet/${item.image}`}
                alt={item.title}
                className={styles.itemImage}
              />
              <p className={styles.itemTitle}>{item.title}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className={`${styles.scrollButton} ${styles.right}`}
          aria-label="Scroll Right"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ClosetCategory;
