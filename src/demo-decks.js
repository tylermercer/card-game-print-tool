import { deckFromArray } from "./load-decks";

const fileContext = require.context('../demo-data/', true, /\.csv$/);
const demoDecks = Promise.all(fileContext.keys().map(key => deckFromArray(fileContext(key), key.slice(2), key, true)));


export default demoDecks;