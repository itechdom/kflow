import React from 'react';
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
  console.log(props);
  return <>
    <button onClick={() => props.knowledge_Create({ title: "hello" })}>create</button>
    <button onClick={() => props.knowledge_Update({
      createdAt: "2023-04-06T18:56:36.906Z",
      gallery: [],
      isASeed: false,
      resource: "knowledge",
      tags: [],
      title: "hello",
      _id: "642f15e403b8593144632737"
    }, { title: "updatedHello" })}>update</button>
  </>
})

const KnowledgeCrud = prop => <Crud
  modelName="knowledge"
  SERVER={config.SERVER}
  offlineStorage={offlineStorage}
  render={(props) => {
    console.log(props);
    return <>
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
