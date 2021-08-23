import fs from 'fs/promises';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';

interface IProduct {
  id: string;
  title: string;
  description: string;
}

const HomePage: NextPage<{ products: IProduct[] }> = ({ products }) => (
  <ul>
    {products.map((product) => (
      <li key={product.id}>{product.title}</li>
    ))}
  </ul>
);

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('(Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());

  if (!data) return { redirect: { destination: '/no-data' }, props: {} };

  if (data.products.length === 0) return { notFound: true };

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
};

export default HomePage;
