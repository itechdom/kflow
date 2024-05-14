import { Provider } from "react-redux";
import { createStore } from "redux";

// Create a store for testing
export const MockStore = ({ children, rootReducer }) => {
  const store = createStore(rootReducer);
  return <Provider store={store}>{children}</Provider>;
};
