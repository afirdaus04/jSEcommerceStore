import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'air5ut9z',
  dataset: 'production', // to determine at what point of development is being done
  apiVersion: '2022-07-05',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

// allows the use of sanity images
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);