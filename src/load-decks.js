import Papa from 'papaparse'

const decksFromFiles = (files) => {
  return Promise.all([...files].map(async f => {
    let data = await toJson(f);
    return deckFromArray(data, f.name, f.path);
  }))
}

const deckFromArray = (data, name, key, demo) => {
  let cards = [];
  data.forEach(d => {
    let num = d.quantity;
    delete d.quantity;
    for (let i = 0; i < num; i++) {
      cards.push({...d})
    }
  })
  return {
    title: name,
    key,
    cards,
    facedown: true,
    demo,
  }
}

const toJson = (file) => {
  return new Promise((resolve, reject) => {
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