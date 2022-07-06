import React from 'react';
import Link from 'next/link';

//retrieve from Sanity dashboard
import { urlFor } from '../lib/client'; 

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      {/*the href points to a dynamic url, requires a child element*/}
      <Link href={`/product/${slug.current}`}>
        {/* Develop product card */}
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])} //will use first image for display
            width={250}
            height={250}
            className="product-image"
          />
          {/* Render out product name and Price */}
          <p className="product-name">{name}</p>
          <p className="product-price">RM{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product