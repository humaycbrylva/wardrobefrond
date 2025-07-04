import React from 'react';
import backgroundImage from '../../../assets/hero3.png';
import styles from './Hero.module.css';
import Slider from 'react-slick';
import wardrobe from '../../../assets/locker_18013906.png'
import clothes from '../../../assets/fashion-design_18314618.png'
import planner from '../../../assets/sketch_13225407.png'
import calendar from '../../../assets/calendar_2693560.png'
import brain from '../../../assets/idea_5221154.png'
// Slick CSS-lər (global faylın içində import et)
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router';

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  };

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}>
        <Slider {...settings}>
          <div className={styles.slide}>
            <div className={styles.box}>
              <img className={styles.img} src={wardrobe} alt="" />
              <h2>WARDROBE+ Xoş Geldin</h2>

            </div>
            
            <p>Geyimlərini şəkillərlə əlavə et və idarə et.</p>
          </div>
          <div className={styles.slide}>
            <div className={styles.box}>
              <img className={styles.img}  src={clothes} alt="" />
              <h2>Rəqəmsal Qarderobunu Yarat</h2>
            </div>
            
            <p>Geyimlərini şəkillərlə əlavə et və idarə et.</p>
          </div>
          <div className={styles.slide}>
            <div className={styles.box}>
              <img className={styles.img} src={planner} alt="" />
              <h2>Kombinlərini Planla</h2>

            </div>
            
            <p>Bacarıqla kombin yarat və saxla.</p>
          </div>
          <div className={styles.slide}>
            <div className={styles.box}>
              <img className={styles.img} src={calendar} alt="" />
              <h2>Geyim Cədvəli Qur</h2>
            </div>
            
            <p>Həftəlik geyimlərini əvvəlcədən planlaşdır.</p>
          </div>
          <div className={styles.slide}>
            <div className={styles.box}>
              <img className={styles.img} src={brain} alt="" />
              <h2>Ağıllı Stil Tövsiyələri</h2>
            </div>
            
            <p>Sənin geyimlərinə uyğun stil təklifləri əldə et.</p>
          </div>
        </Slider>
        
      </div>
      <div className={styles.buttonBox}>
          <button className={styles.heroButton} onClick={handleClick}>
            Hazırsansa, başlayaq →
          </button>
        </div>
    </div>
  );
};

export default Hero;
