// eslint-disable-next-line no-unused-vars
import CouponView from './components/CouponView'
import Header from './components/Header'
import { Analytics } from '@vercel/analytics/react'

function App() {

  return (
    <div>

      <Header />
      <CouponView/>
      <Analytics />
      
    </div>
  )
}

export default App
