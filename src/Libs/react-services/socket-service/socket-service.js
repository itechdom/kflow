import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import axios from "axios";
import io from "socket.io-client";

//export store
/**
 * Represents a socket domain store.
 */
export class socketDomainStore {
  /**
   * Indicates whether the socket is connected or not.
   * @type {boolean}
   */
  //@observable
  isConnected = false;

  /**
   * The socket instance.
   * @type {object}
   */
  socket;

  /**
   * The root store.
   * @type {object}
   */
  rootStore;

  /**
   * The server URL.
   * @type {string}
   */
  SERVER;

  /**
   * A map to store channel data.
   * @type {Map}
   */
  mapStore = observable.map();

  /**
   * Constructs a new socket domain store.
   * @param {object} rootStore - The root store.
   * @param {string} SERVER - The server URL.
   */
  constructor(rootStore, SERVER) {
    this.rootStore = rootStore;
    this.SERVER = SERVER;
  }

  /**
   * Subscribes to a socket channel.
   * @param {object} options - The subscription options.
   * @param {function} options.onInit - The callback function to handle initialization event.
   * @param {function} options.onConnect - The callback function to handle connection event.
   * @param {function} options.onEvent - The callback function to handle event.
   * @param {function} options.onDisconnect - The callback function to handle disconnection event.
   * @param {string} options.channel - The channel name.
   * @param {number} options.port - The port number.
   */
  //@action
  subscribe({ onInit, onConnect, onEvent, onDisconnect, channel, port }) {
    const domainName = `${this.SERVER.socket}:${port}/${channel}`;
    let newSocket = io(domainName);
    newSocket.on("init", data => {
      onInit(data);
    });
    newSocket.on("connect", () => {
      onConnect();
    });
    newSocket.on(channel, data => {
      onEvent(data);
      this.mapStore.set(channel, []);
      this.mapStore.set(channel, [data]);
    });
    newSocket.on("disconnect", () => {
      onDisconnect();
    });
    this.socket = newSocket;
  }

  /**
   * Publishes data to a socket channel.
   * @param {object} options - The publishing options.
   * @param {string} options.channel - The channel name.
   * @param {any} options.value - The value to publish.
   * @returns {Promise} A promise that resolves with the published data.
   */
  //@action
  publish({ channel, value }) {
    console.log(channel, value);
    return new Promise((resolve, reject) => {
      this.socket.emit(`${channel}`, value, data => {
        return resolve(data);
      });
    });
  }

  /**
   * Publishes an update to a socket channel.
   * @param {object} options - The publishing options.
   * @param {string} options.channel - The channel name.
   * @param {any} options.value - The value to publish.
   * @returns {Promise} A promise that resolves with the published data.
   */
  //@action
  publishUpdate({ channel, value }) {
    return new Promise((resolve, reject) => {
      this.socket.emit(`${channel}-update`, value, data => {
        return resolve(data);
      });
    });
  }

  /**
   * Publishes a delete event to a socket channel.
   * @param {object} options - The publishing options.
   * @param {string} options.channel - The channel name.
   * @param {any} options.value - The value to publish.
   * @returns {Promise} A promise that resolves with the published data.
   */
  //@action
  publishDelete({ channel, value }) {
    console.log("publish delete", channel, value);
    return new Promise((resolve, reject) => {
      this.socket.emit(`${channel}-delete`, value, data => {
        return resolve(data);
      });
    });
  }
}

const injectProps = (socketDomainStore, channel, props, child) => {
  let injected = {
    channel: channel,
    publish: value => socketDomainStore.publish({ value, channel }),
    subscribe: ({ onConnect, onEvent, onDisconnect, channel, onInit, port }) =>
      socketDomainStore.subscribe({
        onConnect,
        onEvent,
        onDisconnect,
        channel,
        onInit,
        port
      }),
    ...props,
    ...child.props
  };
  injected[`incoming_${channel}`] = socketDomainStore.mapStore.get(channel);
  injected[`${channel}_update`] = value =>
    socketDomainStore.publishUpdate({ channel, value });
  injected[`${channel}_delete`] = value =>
    socketDomainStore.publishDelete({ channel, value });
  return injected;
};

//determine the theme here and load the right login information?
//@observer
export class Socket extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { channel, children, socketDomainStore } = this.props;
    /**
     * Maps over the React children and injects props using the provided parameters.
     *
     * @param {React.ReactNode} children - The React children to map over.
     * @returns {React.ReactNode} - The mapped React children with injected props.
     */
    const childrenWithProps = React.Children.map(children, child => {
      let injectedProps = injectProps(
        socketDomainStore,
        channel,
        this.props,
        child
      );
      return React.cloneElement(child, injectedProps);
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
