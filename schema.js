import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import GraphQLEmailType from './emailType'
import GraphQLPasswordType from './passwordType'

import Customer from './customer'
import Order from './order'

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    _id: {
      type: GraphQLString
    },
    item: {
      type: GraphQLString
    },
    customerId: {
      type: GraphQLString
    }
  }
})

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLEmailType
    },
    age: {
      type: GraphQLInt
    },
    password: {
      type: GraphQLPasswordType
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: (customer) => {
        return Order.getOrdersByCustomerId(customer._id)
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        _id: {
          type: GraphQLString
        }
      },
      resolve: (parentValue, args) => {
        return Customer.getCustomerById(args._id)
      }
    },
    order: {
      type: OrderType,
      args: {
        _id: {
          type: GraphQLString
        }
      },
      resolve: (parentValue, args) => {
        return Order.getOrderById(args._id)
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve: (parentValue) => {
        return Customer.getAllCustomers()
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: (parentValue) => {
        return Order.getAllOrders()
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLEmailType)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        password: {
          type: new GraphQLNonNull(GraphQLPasswordType)
        }
      },
      resolve: (parentValue, args) => {
        return Customer.createCustomer(args.name, args.email, args.age, args.password)
      }
    },
    addOrder: {
      type: OrderType,
      args: {
        item: {
          type: new GraphQLNonNull(GraphQLString)
        },
        customerId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (parentValue, args) => {
        return Order.createOrder(args.item, args.customerId)
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default Schema
