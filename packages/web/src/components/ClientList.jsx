import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const GET_CLIENT_LIST = gql`
  query GET_CLIENT_LIST($skip: Int!, $take: Int!) {
    clients(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        email
      }
      totalItems
    }
  }
`;

const PAGE_SIZE = 10;

const ClientList = ({ onSelectClient }) => {
  const { data, error, loading, fetchMore, called } = useQuery(
    GET_CLIENT_LIST,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        skip: 0,
        take: PAGE_SIZE,
      },
    }
  );

  const clients = data?.clients.items ?? [];

  const handleSelectClient = (client) => () => onSelectClient?.(client.id);

  const renderClients = () => {
    return clients.map((client) => {
      return (
        <li key={client.id} onClick={handleSelectClient(client)}>
          <p>{client.name}</p>
          <p>{client.email}</p>
        </li>
      );
    });
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        skip: data.clients.items.length,
        take: 10,
      },
      updateQuery: (result, { fetchMoreResult }) => {
        if (!fetchMoreResult) return result;

        return {
          ...result,
          clients: {
            ...result.clients,
            items: result.clients.items.concat(fetchMoreResult.clients.items),
            totalItems: fetchMoreResult.clients.totalItems,
          },
        };
      },
    });
  };

  if (error) {
    return (
      <section>
        <strong>Erro ao buscar os clientes.</strong>
      </section>
    );
  }

  if (loading && !called) {
    return (
      <section>
        <p>Carregando...</p>
      </section>
    );
  }

  return (
    <section>
      <ul>{renderClients()}</ul>
      <button disabled={loading} onClick={handleLoadMore}>
        Carregar mais...
      </button>
    </section>
  );
};

export { ClientList };
