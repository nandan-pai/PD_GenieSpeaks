const mongoose = require('mongoose')
const app = require('./server.js')

const PORT = process.env.PORT || 5000

console.log('Connecting to DB...')

var password = encodeURIComponent("GenieCapstone12#$");

var connectionString = `mongodb+srv://nandan-pai:${password}@geniespeaks.lsyiivk.mongodb.net/GenieSpeaks?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log(err)
  console.log('DB connection Success')
  app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
})
