import fs from 'fs/promises';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';

export interface IProduct {
  id: string;
  title: string;
  description: string;
}

const HomePage: NextPage<{ products: IProduct[] }> = ({ products }) => (
  <ul>
    {products.map((product) => (
      <li key={product.id}>
        <Link href={`/${product.id}`}>{product.title}</Link>
      </li>
    ))}
  </ul>
);

export const getStaticProps: GetStaticProps = async () => {
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
