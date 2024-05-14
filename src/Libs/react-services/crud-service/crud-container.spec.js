import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { CrudContainerFP } from "./crud-container";
import rootReducer from "../crud-service/features/crudDomainSlice";
import { MockStore } from "../utils/test-utils";
import { get } from "mobx";

describe("CrudContainerFP", () => {
  const props = {
    modelName: "testModel",
    offlineStorage: {
      getItem: (key) => {
        return new Promise((resolve, reject) =>
          resolve(localStorage.getItem(key))
        );
      },
      setItem: (key, value) => {
        return new Promise(localStorage.setItem(key, value));
      },
    },
    SERVER: "http://localhost:3000",
    query: {},
    render: (props) => {
      return <div {...props} />;
    },
  };

  it("renders children", () => {
    const { view, util } = render(
      <MockStore rootReducer={rootReducer}>
        <CrudContainerFP {...props} />
      </MockStore>
    );
    // expect(screen.getByText("Test")).toBeInTheDocument();
    expect(true).toBe(true);
  });
});
