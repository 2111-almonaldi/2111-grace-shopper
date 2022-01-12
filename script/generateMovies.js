const movies = require('./rawMovies')
const faker = require('faker')

function generateMovies() {

  let movieArr = []

  for (let id=1; id <= 50; id++) {

    let idx = Math.floor(Math.random() * (movies.length + 1))
    let obj = movies[idx]

      let name = obj["title"]
      let imageUrl = obj["posterUrl"]
      let description = obj["plot"]
      let price = faker.commerce.price(5, 100, true, true)
      let quantity = faker.datatype.number({ min: 1, max: 50})
      let genre1 = obj["genres"].split(',')[0]
      let genre2 = obj["genres"].split(',')[1]
      let genre3 = obj["genres"].split(',')[2]
      let categories = [{"name" : genre1}, {"name" : genre2}, {"name": genre3}]

      movieArr.push({
        id,
        name,
        imageUrl,
        price,
        description,
        quantity,
        categories

    });
  }


  const result =  []
  const map = new Map();
  for (const item of movieArr) {
    if (!map.has(item.id)) {
      map.set(item.id, true)
      result.push({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: item.price,
        description: item.description,
        quantity: item.quantity,
        categories: item.categories
      })
    }
  }
  return result
}


module.exports = { generateMovies }






