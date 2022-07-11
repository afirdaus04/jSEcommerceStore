// The folder is made is square brackets so it is dynamic
// useState field to be utilised for image display on hover
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';


// Changed the [slug] to product details for rendering
const ProductDetails = ({ product, products }) => {

  // Destructures props product
  const { image, name, details, price } = product;

  // At start we would like to display image under the index of 0
  const [index, setIndex] = useState(0);

  // Destructures properties and use the import
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">

            {/* If image exist, use image under specific index */}
            {/* Image[index] utilize useState */}
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>

          {/* fix on the main image display */}
          <div className="small-images-container">

            {/* mapping of image */}
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}

                // the function for image display on main frame
                className={i === index ? 'small-image selected-image' : 'small-image'}

                // Allows mouse on hover image on image and display to the main frame
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
            
            {/* Developing product detail description */}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {/* Rating stars for product */}
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              {/* Number of reviews */}
              (20)
            </p>
          </div>
          {/* Product details */}
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">RM{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          {/* Add to Cart and Buy Now buttons development */}
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
            {/* Similar item development */}
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            {/* track moves the product left to right */}
            <div className="maylike-products-container track">

              {/* 1.37.18 - restudy */}
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

// getStaticProps requires usage of getStaticPaths
// Code below fetches all product and only display current slug property
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  // 1.27.26 - restudy
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}


// getStaticProps is Next.Js function to render page at build time
// check NextJs documentation for detailed information
export const getStaticProps = async ({ params: { slug }}) => {

  // the code fetches the product details slug and displays the first item/image uploaded
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  // fetches all similar product
  const productsQuery = '*[_type == "product"]'
  
  // fetches individual products
  const product = await client.fetch(query);

  // fetches all similar products
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails