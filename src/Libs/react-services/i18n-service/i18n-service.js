/**
 * @fileoverview i18n service module for internationalization and localization.
 * @module i18n-service
 */

import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import { SERVER } from "../../config";

/**
 * Initializes the i18n service.
 * @returns {Object} The i18n instance.
 */
const initializeI18n = () => {
  i18n
    .use(Backend)
    .init({
      backend: {
        loadPath: `${SERVER.host}:${SERVER.port}/locales/{{lng}}/{{ns}}.json`,
        addPath: ` ${SERVER.host}:${SERVER.port}/locales/add/{{lng}}/{{ns}}`,
        allowMultiLoading: false,
        crossDomain: true
      }
    })
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
      fallbackLng: "en",
      debug: true,
      interpolation: {
        escapeValue: false
      },
      react: {
        wait: true
      }
    });

  return i18n;
};

export default initializeI18n;
