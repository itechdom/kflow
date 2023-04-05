import logo from './logo.svg';
import { Crud } from './react-services/crud-service/crud-hook';
import config from './config';
import { memo } from 'react';

//create typescript type for offlineStorage
// type OfflineStorage = {
//   getItem: (key: string) => Promise<string>;
//   setItem: (key: string, value: string) => Promise<string>;
// };
const offlineStorage = {
  getItem: (key) => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(key));
    })
  },
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.setItem(key));

    })
  }
}

const Another = memo((props) => {
  return <> </>
})

const KnowledgeCrud = props => <Crud
  modelName="knowledge"
  SERVER={config.SERVER}
  offlineStorage={offlineStorage}
  render={(props) => {
    console.log("PROPS", props);
    return <>
      <Another {...props} />
      <Another {...props} />
      <Another {...props} />
      <Another {...props} />
    </>
  }}
/>

const App = () => {
  return (
    <div className="App">
      <KnowledgeCrud />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
