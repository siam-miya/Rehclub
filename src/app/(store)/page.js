import Banner from '@/components/store/Banner'
import BestSellingProducts from '@/components/store/BestSellingProducts'
import ExploreAllProducts from '@/components/store/ExploreAllProducts'
import FeaturedProduct from '@/components/store/FeaturedProduct'
import FlashSales from '@/components/store/FlashSales'
import NewArrivals from '@/components/store/NewArrivals'
import React from 'react'

const HomePage = () => {
  return (
 <>
 <Banner/>
 <FlashSales/>
 <NewArrivals/>
 <BestSellingProducts/>
 <FeaturedProduct/>
 <ExploreAllProducts/>
 </>
  )
}

export default HomePage
