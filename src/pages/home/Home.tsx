import HeaderHero from '@/components/home/HeaderHero'
import StateSection from '@/components/home/StateSection'
import VideoHeroSection from '@/components/home/VideoSection'

import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <HeaderHero />

      <StateSection />
      <VideoHeroSection />

    </React.Fragment>
  )
}
