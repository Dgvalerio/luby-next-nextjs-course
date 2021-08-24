import { useEffect, useState } from 'react';

import { NextPage } from 'next';

interface ISale {
  id: string;
  username: string;
  volume: number;
}

const LastSalesPage: NextPage = () => {
  const [sales, setSales] = useState<ISale[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://luby-nextjs-course-default-rtdb.firebaseio.com/Sales.json')
      .then((response) => response.json())
      .then((response) =>
        setSales(
          Object.entries(response).map(
            ([name, value]: [
              string,
              { username: string; volume: number }
            ]) => ({
              id: name,
              ...value,
            })
          )
        )
      )
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!sales) return <p>No data yet!</p>;

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
