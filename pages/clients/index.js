import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    { id: 'max', name: 'Maximilian' },
    { id: 'manu', name: 'Manuel' },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map(({ name, id }) => (
          <li key={id}>
            <Link href={`/clients/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
