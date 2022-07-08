import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';


// The footerBanner property have dynamic properties which can be manipulated inside the Sanity client
const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (


    <div className="footer-banner-container"
    bgcolor = "blue">
      <div className="banner-desc">
        <div className="left">
          {/* Typically the code format would be eg: footBanner.discount /footBanner.saleTime but this is made shorter as we have call back on line 8 with a dynamic container */}
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>

          {/* Linking the product and the button to point at the product */}
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img 
          src={urlFor(image)} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner