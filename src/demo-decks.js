import { deckFromArray } from "./load-decks";
import Papa from 'papaparse';

const fileContext = require.context('../demo-data/', true, /\.csv$/);

const toJson = (string) => {
  return Papa.parse(string, {
    header: true,
  }).data;
}

const demoDecks = Promise.all(fileContext.keys().map(key => deckFromArray(toJson(fileContext(key).default), key.slice(2), key, true)));


export default demoDecks;