import Carousel from './components/Carousel'
import DishSection from './components/DishSection'
import Footer from './components/Footer/Footer'
import HitDishesSection from './components/HitDishesSection'
import MenuNavigation from './components/MenuNavigation'
import Navbar from './components/Navbar/Navbar'
import VerticalDishCard from './components/VerticalDishCard'


function App() {

  return (
    <>
      <Navbar/>
      <HitDishesSection/>
      <Carousel/>
      <MenuNavigation />
      <DishSection />
      <Footer/>
      
    </>
  )
}

export default App
