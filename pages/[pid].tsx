import fs from 'fs/promises';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import path from 'path';

import { IProduct } from './index';

interface ProductDetailPageProps {
  loadedProduct: IProduct;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
  loadedProduct: { title, description },
}) => (
  <>
    <h1>{title}</h1>
    <p>{description}</p>
  </>
);

const getData = async (): Promise<IProduct[]> => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());

  return data.products;
};

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async ({
  params: { pid: productId },
}) => {
  const data = await getData();

  const product = data.find((p: IProduct) => p.id === productId);

  if (!product) return { notFound: true };

  return {
    props: {
      loadedProduct: product,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const paths = data.map((p) => ({ params: { pid: p.id } }));

  return {
    paths,
    fallback: false,
  };
};

export default ProductDetailPage;
