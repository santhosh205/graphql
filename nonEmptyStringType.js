import { GraphQLScalarType } from 'graphql'
import { GraphQLError } from 'graphql/error'
import { Kind } from 'graphql/language'

const NonEmptyStringType = new GraphQLScalarType({
  name: 'NonEmptyString',
  serialize: (value) => { return value },
  parseValue: (value) => { return value },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast])
    }

    if (!ast.value.length) {
      throw new GraphQLError('Query error: String must not be empty', [ast])
    }

    return ast.value
  }
})

export default NonEmptyStringType
