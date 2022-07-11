

//  Start with Sanity to Manage Content "cd .\ecommerce\sanity_ecommerce\"
//  To start app go into "ecommerce" folder "cd .\ecommerce\" then "npm run dev" and click "localhost:3000" on the CLI
// To manage the products cd into sanity_ecommerce and run "sanity start" on the CLI


import React from 'react';

// 
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css'; //import styles

// Import of state context which is utilised for real time changes
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    // Wrapping is done for the whole APP here*****
    <StateContext>
{/* Wrapping components inside Layouts */}
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    
    </StateContext>
  )
}

export default MyApp
