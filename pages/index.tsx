import { FC } from 'react';

import { GetStaticProps } from 'next';

interface IProduct {
  id: string;
  title: string;
  description: string;
}

const HomePage: FC<{ products: IProduct[] }> = ({ products }) => (
  <ul>
    {products.map((product) => (
      <li key={product.id}>{product.title}</li>
    ))}
  </ul>
);

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    products: [
      {
        id: 'p1',
        title: 'Product 1',
        description: 'This is product 1',
      },
    ],
  },
});

export default HomePage;
