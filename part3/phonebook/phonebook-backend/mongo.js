const mongoose = require('mongoose')

async function main() {

  if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

  
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  if (!password || !name || !number) {
    console.log(`Please provide all the required arguments!`)
    return
  }

  const url = `mongodb+srv://phattrongwork:${password}@cluster0.hvdby6m.mongodb.net/?retryWrites=true&w=majority`
  mongoose.set('strictQuery',false)

  try {
    mongoose.connect(url);
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })
    const Person = mongoose.model('person', personSchema)
    const newPerson = Person({
      name,
      number,
    })
    newPerson.save().then(result => {
      console.log('Yay!')
    })
    await Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
    })
  } catch (error) {
    console.error('Error connecting to the database')
  } finally {
    mongoose.connection.close()
  }
  }


main();