import { FC } from 'react';

import fs from 'fs/promises';
import { GetStaticProps } from 'next';
import path from 'path';

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

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());

  return {
    props: {
      products: data.products,
    },
  };
};

export default HomePage;
