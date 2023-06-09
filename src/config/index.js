import { remote, local } from "./hosts";
const config = {
  SERVER: {
    host: local,
    port: "4000",
    origin: "http://localhost:8085",
    wikipedia: {
      host: "https://en.wikipedia.org/w/api.php",
      port: ""
    },
    wikimedia: {
      host: "https://commons.wikimedia.org/w/api.php"
    }
  }
};
export default config;
