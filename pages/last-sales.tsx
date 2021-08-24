import { useEffect, useState } from 'react';

import { NextPage } from 'next';
import useSWR from 'swr';

interface ISale {
  id: string;
  username: string;
  volume: number;
}

const LastSalesPage: NextPage = () => {
  const [sales, setSales] = useState<ISale[]>();

  const { data, error } = useSWR(
    'https://luby-nextjs-course-default-rtdb.firebaseio.com/Sales.json'
  );

  useEffect(() => {
    if (data)
      setSales(
        Object.entries(data).map(
          ([name, value]: [string, { username: string; volume: number }]) => ({
            id: name,
            ...value,
          })
        )
      );
  }, [data]);

  if (error) return <p>Failed to load!</p>;

  if (!data || !sales) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
