import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";

//export store
/**
 * Represents the game domain store.
 */
export class gameDomainStore {
  /**
   * The character position in the game.
   * @type {{x: number, y: number}}
   */
  characterPosition = { x: 0, y: 0 };

  /**
   * The stage X position in the game.
   * @type {number}
   */
  stageX = 0;

  /**
   * The name of the model.
   * @type {string}
   */
  modelName;

  /**
   * The map store.
   * @type {observable.map}
   */
  mapStore = observable.map();

  /**
   * The root store.
   * @type {any}
   */
  rootStore;

  /**
   * The server.
   * @type {any}
   */
  SERVER;

  /**
   * The offline storage.
   * @type {any}
   */
  offlineStorage;

  /**
   * Constructs a new gameDomainStore object.
   * @param {any} rootStore - The root store.
   * @param {any} offlineStorage - The offline storage.
   * @param {any} SERVER - The server.
   */
  constructor(rootStore, offlineStorage, SERVER) {
    this.rootStore = rootStore;
    if (offlineStorage) {
      this.offlineStorage = offlineStorage;
    }
    this.SERVER = SERVER;
    this.setCharacterPosition = this.setCharacterPosition.bind(this);
    this.setStageX = this.setStageX.bind(this);
  }

  /**
   * Sets the character position.
   * @param {{x: number, y: number}} position - The new position of the character.
   */
  setCharacterPosition(position) {
    this.characterPosition = position;
  }

  /**
   * Sets the stage X position.
   * @param {number} x - The new X position of the stage.
   */
  setStageX(x) {
    if (x > 0) {
      this.stageX = 0;
    } else if (x < -2048) {
      this.stageX = -2048;
    } else {
      this.stageX = x;
    }
  }
}

//determine the theme here and load the right login information?
//@observer
export class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let { gameDomainStore, children, ...rest } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        characterPosition: gameDomainStore.characterPosition,
        setCharacterPosition: gameDomainStore.setCharacterPosition,
        setStageX: gameDomainStore.setStageX,
        stageX: gameDomainStore.stageX,
        ...child.props,
        ...rest
      });
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}
