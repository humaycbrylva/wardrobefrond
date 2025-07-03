// frontend/components/TrendModel.jsx
import React from 'react';
import styles from './TrendModel.module.css';

const TrendModel = ({ item, onClose, onDelete, onEdit }) => {
  if (!item) return null;

  return (
    <div className={styles.trendmodalbackdrop} onClick={onClose}>
      <div className={styles.trendmodal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closebtn} onClick={onClose}>×</button>
        
        <img src={`http://localhost:5000/trending/${item.image}`} alt={item.title} />
        <h2>{item.title}</h2>
        <p><strong>Açıqlama:</strong> {item.description}</p>
        <p><strong>Kateqoriya:</strong> {item.category}</p>

        {item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            <strong>Taglər:</strong>
            {item.tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => onEdit(item)}>📝 Edit</button>
          <button className={styles.deleteBtn} onClick={() => onDelete(item._id)}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TrendModel;
