const movies = require('./rawMovies')
const faker = require('faker')

export default function generateMovies() {

  let movieArr = []

  for (let id=1; id <= 5; id++) {

    let idx = Math.floor(Math.random() * (movies.length + 1))
    let obj = movies[idx]

    if (obj["Type"] === 'movie') {
      let name = obj["Title"]
      let imageUrl = obj["Poster"]
      let description = obj["Plot"]
      let price = faker.commerce.price(5, 100, true, true)
      let quantity = faker.datatype.number({ min: 1, max: 50})
      let genre1 = obj["Genre"].split(',')[0]
      let genre2 = obj["Genre"].split(',')[1]
      let genre3 = obj["Genre"].split(',')[2]
      let categoryId = [genre1, genre2, genre3]

      movieArr.push({
        id,
        name,
        imageUrl,
        price,
        description,
        quantity,
        categoryId

    });
  }

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
        categoryId: item.categoryId
      })
    }
  }
  return result
}









