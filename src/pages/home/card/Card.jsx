import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

const Card = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register'); // Qeydiyyatdan keçmək səhifəsinə yönləndirir
  };

  return (
    <div className={styles.home}>
      {/* Yeni Gələnlər Bölməsi */}
      <section className={styles.newArrivals}>
        <h2 className={styles.title}>Yeni Gələnlər</h2>
        <div className={styles.slider}>
          {/* Kartlar */}
          <div className={styles.card}>Geyim 1</div>
          <div className={styles.card}>Geyim 2</div>
          <div className={styles.card}>Geyim 3</div>
        </div>
      </section>

      {/* Tövsiyə Edilən Kombinlər */}
      <section className={styles.suggestedOutfits}>
        <h2 className={styles.title}>Tövsiyə Edilən Kombinlər</h2>
        <div className={styles.grid}>
          {/* Kartlar */}
          <div className={styles.card}>Kombin 1</div>
          <div className={styles.card}>Kombin 2</div>
          <div className={styles.card}>Kombin 3</div>
        </div>
      </section>

      {/* Statistika */}
      <section className={styles.statistics}>
        <h2 className={styles.title}>Sənin üçün Statistika</h2>
        <div className={styles.stats}>
          {/* Statistika elementləri (qrafiklər və s.) */}
          <div className={styles.stat}>Rəng İstifadəsi</div>
          <div className={styles.stat}>Geyim Vərdişləri</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.callToAction}>
        <h2>Hazırsan?</h2>
        <p>Virtual qarderobunla işə başla və daha tərtibli bir həyat əldə et!</p>
        <button className={styles.ctaButton} onClick={handleClick}>
          İndi Başlayın
        </button>
      </section>
    </div>
  );
};

export default Card;
