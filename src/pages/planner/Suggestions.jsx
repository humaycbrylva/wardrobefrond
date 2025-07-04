import React, { useEffect, useState } from 'react';
import styles from './Suggestions.module.css';
import axios from '../../services/axiosInstance';
import { FaPlus } from 'react-icons/fa';

const Suggestions = ({ occasionFilter, onAdd }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const res = await axios.get('/suggestions', {
          params: { occasion: occasionFilter }
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error('Suggestions alınmadı:', err);
      }
    }
    fetchSuggestions();
  }, [occasionFilter]);

  return (
    <section className={styles.container}>
      <h2>Tövsiyə olunan kombinlər</h2>
      {suggestions.length === 0 && (
        <p className={styles.noSuggestions}>Bu kateqoriyaya uyğun təklif yoxdur.</p>
      )}
      <div className={styles.cards}>
        {suggestions.map(item => (
          <div key={item._id} className={styles.card}>
            <img
              src={`http://localhost:5000/suggestions/${item.image}`}
              alt={item.title}
              className={styles.image}
            />
            <div className={styles.cardBody}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description || 'Qısa təsvir yoxdur'}</p>
              <button
                className={styles.addBtn}
                onClick={() => onAdd(item)}
                aria-label={`Add ${item.title}`}
              >
                <FaPlus /> Əlavə et
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Suggestions;

