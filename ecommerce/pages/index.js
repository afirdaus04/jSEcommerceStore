import React from 'react';

import { client } from '../lib/client'; // import sanity client
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => (
  <div>
    {/* Heading - Product and banner*/}
    {/* the heroBanner property data is retrieved from the components function */}
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    {/* Products Container for Display */}
    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>


    {/* Developing footer banner where if banner data exist, it is placed on the array of 0 */}
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
  
);


// Fetching data using NextJS is by getServerSideProps function - API Fetching
export const getServerSideProps = async () => {
  // creation of sanity query for "products"
  const query = '*[_type == "product"]';
  // fetching all of data from sanity dashboard
  const products = await client.fetch(query); 

  // creation of sanity query for "banner"
  const bannerQuery = '*[_type == "banner"]';
  // fetching all of data from sanity dashboard
  const bannerData = await client.fetch(bannerQuery);


  // return of above function
  return {
    props: { products, bannerData }
  }
}

export default Home;
