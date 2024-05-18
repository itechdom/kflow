import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createModel } from "../features/crudDomainSlice";

// // Define types for OfflineStorage, SERVER configuration, and the hook's return type
// interface OfflineStorage {
//   getItem: (key: string) => Promise<string | null>;
// }

// interface ServerConfig {
//   host: string;
//   port: string;
// }

// interface Message {
//   role: "user" | "assistant" | "system";
//   content: string;
// }

// type UseGetModel = (
//   offlineStorage: OfflineStorage,
//   SERVER: ServerConfig,
//   query: string,
//   modelName: string
// ) => [typeof useMLFn, any, boolean, Message[], React.Dispatch<React.SetStateAction<Message[]>>];

/**
 * Custom hook for creating a model.
 *
 * @param {Object} offlineStorage - The offline storage object.
 * @param {Object} SERVER - The server configuration object.
 * @param {string} query - The query string.
 * @param {string} modelName - The name of the model.
 * @returns {Array} - An array containing the createModel function, error state, isLoading state, messages, and setMessages function.
 */
export const useML = (offlineStorage, SERVER, query, modelName) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  console.log(messages, "MESSAGES");

  /**
   * Function for creating a model.
   *
   * @param {Object} model - The model object to be created.
   * @param {string} path - The API path.
   * @param {string} prompt - The prompt for the model.
   * @param {Function} onResponse - Callback function to handle the response.
   * @returns {Promise<void>} - A promise that resolves when the model is created.
   */
  const useMLFn = (model, path, prompt, onResponse) =>
    offlineStorage
      .getItem("jwtToken")
      .then((token) => {
        if (!token) {
          throw new Error("Token is missing");
        }

        // Add the user's message to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: prompt },
        ]);

        return axios
          .post(`${SERVER.host}:${SERVER.port}/${modelName}/chat`, {
            prompt,
            token,
          })
          .then((res) => {
            // Check for valid response
            if (res.data?.choices?.[0]?.message?.content) {
              let response = res.data.choices[0].message.content;
              // Strip all \n and \
              response = response.replace(/\\n/g, "").replace(/\\/g, "");
              const parsedResponse = JSON.parse(response);

              // Add the assistant's message to the messages array
              setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: parsedResponse },
              ]);

              // Remove path from response and only include new additions
              onResponse(parsedResponse, messages);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setError(err);
      });

  return [useMLFn, error, isLoading, messages, setMessages];
};
