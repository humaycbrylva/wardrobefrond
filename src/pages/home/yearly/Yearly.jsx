import React from 'react';
import styles from './Yearly.module.css';

const Yearly = ({ trends }) => {
  return (
    <section className={styles.container}>
      <h2>2024-2026 Trend Rəng və Geyim Trendləri</h2>
      {trends.map(({ year, colors, styles: styleDesc }) => (
        <div key={year} className={styles.card} data-year={year}>
          <h3>{year} Trends</h3>
          <div className={styles.colors}>
            {colors.map(({ hex, name }, idx) => (
              <div
                key={idx}
                className={styles.colorCircle}
                style={{ backgroundColor: hex }}
                title={name}
              />
            ))}
          </div>
          <p className={styles.stylesDescription}>{styleDesc}</p>
        </div>
      ))}
    </section>
  );
};

export default Yearly;
