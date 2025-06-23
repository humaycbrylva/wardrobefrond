import React, { useState } from 'react';
import styles from './Features.module.css';

const data = {
  purpose: {
    title: 'Layihənin Məqsədi',
    options: {
      idarə: 'Geyimləri qarışdırmadan idarə etmək',
      zaman: 'Stil planlama ilə zaman qazanmaq',
      minimalizm: 'Minimalizm və səmərəlilik mərkəzli yanaşma'
    }
  },
  style: {
    title: 'Sənin Stilin',
    options: {
      kombin: 'İstər universitetə, istər ofisə — kombinlərin səninlədir.',
      sual: 'Artıq “nə geyinim?” sualına son!'
    }
  },
  features: {
    title: 'Əlavə Xüsusiyyətlər',
    options: {
      sekil: 'Geyimləri şəkillə əlavə et',
      kateqoriya: 'Geyimləri kateqoriyalara böl',
      kombin: 'Kombinlərini yarat və saxla',
      teqvim: 'Geyim planını təqvimlə gör',
      stil: 'Stil tövsiyələri al (əgər AI olacaqsa)'
    }
  },
  stats: {
    title: 'Statistika',
    options: {
      reng: 'Ən çox geyindiyin rəng',
      ayliq: 'Son 1 ayda geyindiklərin',
      geyinilmeyen: 'Geyinilməyən geyimlər siyahısı'
    }
  }
};

const Features = () => {
  const [activeMain, setActiveMain] = useState('purpose');
  const [selectedOption, setSelectedOption] = useState(null);

  const mainKeys = Object.keys(data);
  const currentData = data[activeMain];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul>
          {mainKeys.map((key) => (
            <li
              key={key}
              className={activeMain === key ? styles.active : ''}
              onClick={() => {
                setActiveMain(key);
                setSelectedOption(null); // yeni bölmə seçiləndə alt seçim sıfırlansın
              }}
            >
              {data[key].title}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.contentWrapper}>
        <h2>{currentData.title}</h2>
        <div className={styles.options}>
          {Object.entries(currentData.options).map(([key, label]) => (
            <button
              key={key}
              className={selectedOption === key ? styles.optionActive : ''}
              onClick={() => setSelectedOption(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {selectedOption && (
          <div className={styles.result}>
            <p><strong>{currentData.options[selectedOption]}</strong> haqqında ətraflı məlumat burada olacaq.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;



