import React from 'react'
import MainDiv from '../../components/layout/MainDiv'
import Hero from './hero/Hero'
import Features from './features/Features'
import Card from './card/Card'
import Trending from './trending/Trending'


const Home = () => {
  return (
    <MainDiv>
        <Hero/>
        <Features />
        <Trending/>
        <Card/>
    </MainDiv>
  )
}

export default Home