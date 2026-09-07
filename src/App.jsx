import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import About from './pages/About'
import Order from './pages/Order'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/commander/:slug" element={<Order />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/finaliser-commande" element={<Checkout />} />
          <Route path="/commande-confirmee" element={<OrderConfirmation />} />
          <Route path="/cgu" element={<Terms />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/a-propos" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
