import React from 'react';
import logo from './logo.svg';
import { Crud } from 'Libs/react-services/crud-service/crud-container';
import { Wikipedia } from 'Libs/react-services/wikipedia-service/wikipedia-container';
import config from './Config';
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
  return <>
    <button onClick={() => props.knowledge_createModel({ title: "hello" })}>create</button>
    <button onClick={() => props.knowledge_updateModel({
      createdAt: "2023-04-06T18:56:36.906Z",
      gallery: [],
      isASeed: false,
      resource: "knowledge",
      tags: [],
      title: "hello",
      _id: "642f21d6b4e24846b9e48c69"
    }, { title: "updatedHello" })}>update</button>
    <button onClick={() => props.knowledge_deleteModel({
      createdAt: "2023-04-06T18:56:36.906Z",
      gallery: [],
      isASeed: false,
      resource: "knowledge",
      tags: [],
      title: "hello",
      _id: "642f2212b4e24846b9e48c70"
    })}>delete</button>
    <button onClick={() => props.fetchTopicByPage("Physics")}>get wikipedia</button>
  </>
})

const KnowledgeCrud = prop => <Wikipedia
  SERVER={config.SERVER}
  offlineStorage={offlineStorage}
>
  <Crud
    modelName="knowledge"
    SERVER={config.SERVER}
    offlineStorage={offlineStorage}
    render={(props) => {
      return <>
        <Another fetchTopicByPage={props.fetchWikipediaPageByTopic} {...props} />
      </>
    }}
  />
</Wikipedia>
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
