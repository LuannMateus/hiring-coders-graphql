import { useState } from 'react';
import { ClientEdit } from '../components/ClientEdit';
import { ClientList } from '../components/ClientList';

const Home = () => {
  const [clientId, setClientId] = useState(null);

  return (
    <div>
      <h1>HOME</h1>
      <ClientList onSelectClient={setClientId} />
      <ClientEdit clientId={clientId} />
    </div>
  );
};

export { Home };
