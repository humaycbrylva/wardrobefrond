import React from 'react';
import MainDiv from '../../components/layout/MainDiv';
import Hero from './hero/Hero';
import Features from './features/Features';
import Trending from './trending/Trending';
import Card from './card/Card';
import Yearly from './yearly/Yearly';

const trendsData = [
  {
    year: 2024,
    colors: [
      { name: 'Bej', hex: '#F5F5DC' },
      { name: 'Krem', hex: '#FFFDD0' },
      { name: 'Şeftali', hex: '#FFE5B4' },
      { name: 'Turuncu', hex: '#FF7F50' },
      { name: 'Yeşil', hex: '#228B22' },
      { name: 'Mavi', hex: '#1E90FF' },
      { name: 'Kahverengi', hex: '#8B4513' },
      { name: 'Pişmiş Toprak', hex: '#E2725B' },
      { name: 'Zeytin Yeşili', hex: '#808000' },
      { name: 'Peach Fuzz', hex: '#FED7C2' },
    ],
    styles: `Retro tarzı,puantiyelər, pastel rənklər, çiçək baskıları, fırfırlı və dantelli detaylar,XL çantalar və kısa topuklu ayakkabılar.`,
  },
  {
    year: 2025,
    colors: [
      { name: 'Mocha Mousse', hex: '#837060' },
      { name: 'Toz Pembe', hex: '#D8A39D' },
      { name: 'Altın Sarısı', hex: '#FFD700' },
      { name: 'Buz Mavisi', hex: '#A3C1DA' },
      { name: 'Kiremit Kırmızısı', hex: '#B7410E' },
      { name: 'Zeytin Yeşili', hex: '#808000' },
      { name: 'Future Dusk', hex: '#5A4E7C' },
    ],
    styles: `Mini və boyəm ətəklər, yüksək bel pantolonlar,spor giyim,çiçək desənli elbisələr,oversize ceketler, büyük boy blazerlar,inci aksesuarlar.`,
  },
  {
    year: 2026,
    colors: [
      { name: 'Dönüştürücü Teal', hex: '#008080' },
      { name: 'Bordo', hex: '#800020' },
      { name: 'Kırmızı', hex: '#FF0000' },
      { name: 'Şeftali', hex: '#FFE5B4' },
      { name: 'Pembe', hex: '#FFC0CB' },
      { name: 'Electric Fuchsia', hex: '#FF00FF' },
      { name: 'Blue Aura', hex: '#5D8AA8' },
      { name: 'Amber Haze', hex: '#FFBF00' },
      { name: 'Jelly Mint', hex: '#A7D3A6' },
    ],
    styles: `Suni kürklər,erkək modasında suni kürklər, dəri detaylar,
      spor giyim, ilkbahar/yaz sezonu parlak rənkləri.`,
  },
];

const Home = () => {
  return (
    <MainDiv>
      <Hero />
      <Features />
      <Trending />
      <Yearly trends={trendsData} />
      <Card />
    </MainDiv>
  );
};

export default Home;
