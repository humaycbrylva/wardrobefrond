import React, { useEffect, useState } from 'react';
import styles from './TrendModel.module.css';

const TrendModel = ({ item, onClose, onDelete, onEdit }) => {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (item?.mainImage) {
      setSelectedImage(item.mainImage);
    } else if (item?.galleryImages?.length > 0) {
      setSelectedImage(item.galleryImages[0]);
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className={styles.trendmodalbackdrop} onClick={onClose}>
      <div className={styles.trendmodal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closebtn} onClick={onClose}>×</button>

        <div className={styles.content}>
          {/* Sol tərəf - şəkil siyahısı (gallery) */}
          <div className={styles.imageList}>
            {item.galleryImages && item.galleryImages.length > 0 ? (
              item.galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/gallery/${img}`}
                  alt={`${item.title} ${idx}`}
                  className={`${styles.thumb} ${img === selectedImage ? styles.activeThumb : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))
            ) : (
              // Əgər galleryImages yoxdursa, sadəcə mainImage göstər
              <img
                src={`http://localhost:5000/trending/${item.mainImage}`}
                alt={item.title}
                className={styles.thumb}
              />
            )}
          </div>

          {/* Sağ tərəf - seçilmiş böyük şəkil və məlumatlar */}
          <div className={styles.mainContent}>
  <img
    src={
      selectedImage === item.mainImage
        ? `http://localhost:5000/trending/${selectedImage}`
        : `http://localhost:5000/gallery/${selectedImage}`
    }
    alt={item.title}
    className={styles.mainImage}
  />
  <h2>{item.title}</h2>

  <div className={styles.infoSection}>
    <p><strong>Marka:</strong> {item.brand}</p>
    <p><strong>Kateqoriya:</strong> {item.category}</p>

    {item.tags && item.tags.length > 0 && (
      <div className={styles.tags}>
        <strong>Taglər:</strong>
        {item.tags.map((tag, idx) => (
          <span key={idx} className={styles.tag}>{tag}</span>
        ))}
      </div>
    )}
  </div>

  <div className={styles.actions}>
    <button className={styles.editBtn} onClick={() => onEdit(item)}>📝 Edit</button>
    <button className={styles.deleteBtn} onClick={() => onDelete(item._id)}>🗑️ Delete</button>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default TrendModel;
