import fs from 'fs/promises';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import path from 'path';

import { IProduct } from './index';

interface ProductDetailPageProps {
  loadedProduct: IProduct;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
  loadedProduct,
}) => {
  if (!loadedProduct) return <p>Loading...</p>;

  const { title, description } = loadedProduct;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async ({
  params: { pid: productId },
}) => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());
  const product = data.products.find(
    (aProduct: IProduct) => aProduct.id === productId
  );

  if (!product) return { notFound: true };

  return {
    props: {
      loadedProduct: product,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { pid: 'p1' } }],
  fallback: true,
});

export default ProductDetailPage;
