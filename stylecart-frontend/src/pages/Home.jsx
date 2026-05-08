import React from 'react'
import Cover from '../components/Cover'   // ✅ "C" must be capital (matches file name exactly)
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div>
      <Cover />
      <LatestCollection/>
      <BestSeller/>
     <OurPolicy/>
     <NewsLetterBox/>
    </div>
  )
}

export default Home;