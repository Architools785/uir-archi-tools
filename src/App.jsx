import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Products from './components/Products'
import HowToOrder from './components/HowToOrder'
import WhyUs from './components/WhyUs'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <HowToOrder />
        <WhyUs />
      </main>
      <Footer />
    </>
  )
}

export default App
