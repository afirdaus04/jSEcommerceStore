

//  Start with Sanity to Manage Content "cd .\ecommerce\sanity_ecommerce\"
//  To start app go into "ecommerce" folder "cd .\ecommerce\" then "npm run dev" and click "localhost:3000" on the CLI


import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css'; //import styles
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
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
