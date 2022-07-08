import React from 'react';
import Head from 'next/head';

// Short cut to import component is ctrl+space
import Navbar from './Navbar';
import Footer from './Footer';


// react special : the props "children" allows the rendering of components
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Ahmad's JavaScript Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout