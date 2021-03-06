import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    // Navbars Logo
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Ahmad's Selections</Link>
      </p>
    
    {/* development button to show the order and amount inside shopping cart */}
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {/* Cart logo */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar