import { GraphQLScalarType } from 'graphql'
import { GraphQLError } from 'graphql/error'
import { Kind } from 'graphql/language'

const PasswordType = new GraphQLScalarType({
  name: 'Password',
  serialize: (value) => { return value },
  parseValue: (value) => { return value },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast])
    }

    const password = ast.value

    if (password.length < 6) {
      throw new GraphQLError('Query error: Password should have atleast 6 characters', [ast])
    }

    const reNumber = /\d+/
    if (!reNumber.test(password)) {
      throw new GraphQLError('Query error: The Password should contain atleast one number', [ast])
    }

    const reLowercase = /[a-z]+/
    if (!reLowercase.test(password)) {
      throw new GraphQLError('Query error: The Password should contain atleast one lowercase letter', [ast])
    }

    const reUppercase = /[A-Z]+/
    if (!reUppercase.test(password)) {
      throw new GraphQLError('Query error: The Password should contain atleast one uppercase letter', [ast])
    }

    if (password.includes(' ')) {
      throw new GraphQLError('Query error: The Password should not contain any spaces', [ast])
    }

    return password
  }
})

export default PasswordType
