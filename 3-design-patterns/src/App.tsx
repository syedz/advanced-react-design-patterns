import axios from 'axios';
import { BookInfo } from './components/book-info';
import { CurrentUserLoader } from './components/current-user-loader';
import { DataSource } from './components/data-source';
import { ResourceLoader } from './components/resource-loader';
import { UserInfo } from './components/user-info';
import { UserLoader } from './components/user-loader';
import { DataSourceWithRender } from './components/data-source-with-render';

// Helper function defined outside for clean code
const getServerData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const getDataFromLocalStorage = async (key: string) => {
  return localStorage.getItem(key);
};

// 2. Presentational Component
interface MessageProps {
  msg?: string;
}

const Message: React.FC<MessageProps> = ({ msg }) => {
  return <h1>{msg}</h1>;
};

function App() {
  return (
    <>
      {/* <CurrentUserLoader> */}
        {/* UserInfo is unaware it's receiving data from a loader */}
        {/* <UserInfo />
      </CurrentUserLoader> */}

      {/* <UserLoader userId="1">
        <UserInfo />
      </UserLoader> */}

      {/* <UserLoader userId="2">
        <UserInfo />
      </UserLoader> */}

      {/* <UserLoader userId="3">
        <UserInfo />
      </UserLoader> */}

      {/* Loading a User */}
      {/* <ResourceLoader resourceUrl="/users/2" resourceName="user">
        <UserInfo />
      </ResourceLoader> */}

      {/* Loading a Book using the exact same loader logic */}
      {/* <ResourceLoader resourceUrl="/books/1" resourceName="book">
        <BookInfo />
      </ResourceLoader> */}

      <DataSource 
        getData={() => getServerData("/users/3")} 
        resourceName="user"
      >
        <UserInfo />
      </DataSource>

      <DataSourceWithRender
        getData={() => getServerData("/users/1")}
        render={(resource) => <UserInfo user={resource} />}
      />

      {/* Assuming a key 'test' exists in browser LocalStorage */}
      <DataSource 
        getData={() => getDataFromLocalStorage("test")} 
        resourceName="msg"
      >
        <Message />
      </DataSource>
    </>
  );
}

export default App;