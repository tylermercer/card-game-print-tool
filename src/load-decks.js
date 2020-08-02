import Papa from 'papaparse'

const decksFromFiles = async (files) => {
  let errors = [];
  let results = await Promise.all(
    [...files].map(async f => {
      let data = await toJson(f);
      return await deckFromArray(data, f.name, f.path);
    })
    .map(p => p.catch(e => {
      errors.push(e);
    }))
  )
  return [results.filter(f => f != null), errors];
}

const hasKeys = (object, keys) => keys.reduce((t, k) => t && (k in object), true);

const isDeck = (deck) => {
  return hasKeys(deck[0], [
    'title',
    'body',
    'backText',
    'backColor',
    'frontColor',
    'quantity'
  ]);
}

const deckFromArray = async (data, name, key, demo) => {
  let cards = [];
  if (!data)
    throw Error(`No cards in file '${name}'`);
  if (!isDeck(data))
    throw Error(`'${name}' does not have the correct columns`);
  for (let i in data) {
    let d = data[i];
    let num = +d.quantity;
    if (`${num}` === 'NaN')
      throw Error(`One or more rows in '${name}' has a non-numeric quantity`);
    delete d.quantity;
    for (let j = 0; j < num; j++) {
      cards.push({...d})
    }
  }
  return {
    title: name,
    key,
    cards,
    facedown: true,
    demo,
  }
}

const csvRegex = new RegExp("(.*?)\\.(csv)$");

const toJson = (file) => {
  return new Promise((resolve, reject) => {
    if (!csvRegex.test(file.name)) reject(new Error(`'${file.name}' is not a CSV`))
    Papa.parse(file, {
      header: true,
      complete (results) {
        resolve(results.data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

export {
  deckFromArray,
  decksFromFiles
};