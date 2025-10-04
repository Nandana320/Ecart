import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import View from './pages/View'
import Pnf from './pages/Pnf'
import Header from './components/Header'
import Footer from './components/Footer'
import Orders from './pages/Orders'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {/* <Header /> */}

      {/* Main content grows to fill space */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/view" element={<View />} />
          <Route path="/*" element={<Pnf />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
