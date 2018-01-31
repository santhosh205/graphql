import express from 'express'
import expressGraphQL from 'express-graphql'
import Schema from './schema'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/graphqlv1')

const app = express()

app.use('/graphql', expressGraphQL({
  schema: Schema,
  graphiql: true
}))

app.set('PORT', (process.env.PORT || 4000))

app.listen(app.get('PORT'), () => {
  console.log('Server is running on port ' + app.get('PORT') + '...')
})
