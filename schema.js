import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import EmailType from './emailType'
import PasswordType from './passwordType'
import NonEmptyStringType from './nonEmptyStringType'

import Customer from './customer'
import Order from './order'

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    _id: {
      type: NonEmptyStringType
    },
    item: {
      type: NonEmptyStringType
    },
    customerId: {
      type: NonEmptyStringType
    },
    status: {
      type: NonEmptyStringType
    }
  }
})

const OrderStatusInputType = new GraphQLEnumType({
  name: 'OrderStatusInput',
  values: {
    CONFIRMED: {
      value: 'CONFIRMED'
    },
    INTRANSIT: {
      value: 'INTRANSIT'
    },
    DELIVERED: {
      value: 'DELIVERED'
    },
    CANCELLED: {
      value: 'CANCELLED'
    }
  }
})

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: {
    _id: {
      type: NonEmptyStringType
    },
    name: {
      type: NonEmptyStringType
    },
    email: {
      type: EmailType
    },
    age: {
      type: GraphQLInt
    },
    password: {
      type: PasswordType
    },
    status: {
      type: GraphQLBoolean
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: (customer) => {
        return Order.getOrdersByCustomerId(customer._id)
      }
    }
  }
})

const CreateCustomerInputType = new GraphQLInputObjectType({
  name: 'CreateCustomerInput',
  fields: {
    name: {
      type: new GraphQLNonNull(NonEmptyStringType)
    },
    email: {
      type: NonEmptyStringType
    },
    age: {
      type: GraphQLInt
    },
    password: {
      type: new GraphQLNonNull(PasswordType)
    }
  }
})

const UpdateCustomerInputType = new GraphQLInputObjectType({
  name: 'UpdateCustomerInput',
  fields: {
    name: {
      type: NonEmptyStringType
    },
    email: {
      type: NonEmptyStringType
    },
    age: {
      type: GraphQLInt
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
          type: new GraphQLNonNull(NonEmptyStringType)
        }
      },
      resolve: (parentValue, { _id }) => {
        return Customer.getCustomerById(_id)
      }
    },
    getActiveAccounts: {
      type: new GraphQLList(CustomerType),
      resolve: (parentValue) => {
        return Customer.getActiveAccounts()
      }
    },
    getDeavtivatedAccounts: {
      type: new GraphQLList(CustomerType),
      resolve: (parentValue) => {
        return Customer.getDeactivatedAccounts()
      }
    },
    allCustomers: {
      type: new GraphQLList(CustomerType),
      resolve: (parentValue) => {
        return Customer.getAllCustomers()
      }
    },
    order: {
      type: OrderType,
      args: {
        _id: {
          type: new GraphQLNonNull(NonEmptyStringType)
        }
      },
      resolve: (parentValue, { _id }) => {
        return Order.getOrderById(_id)
      }
    },
    getOrdersByStatus: {
      type: new GraphQLList(OrderType),
      args: {
        status: {
          type: OrderStatusInputType
        }
      },
      resolve: (parentValue, { status }) => {
        return Order.getOrdersByStatus(status)
      }
    },
    allOrders: {
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
        input: {
          type: new GraphQLNonNull(CreateCustomerInputType)
        }
      },
      resolve: (parentValue, { input }) => {
        return Customer.createCustomer(input)
      }
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        _id: {
          type: new GraphQLNonNull(NonEmptyStringType)
        },
        input: {
          type: new GraphQLNonNull(UpdateCustomerInputType)
        }
      },
      resolve: (parentValue, { _id, input }) => {
        return Customer.updateCustomerById(_id, input)
      }
    },
    deactivateAccount: {
      type: CustomerType,
      args: {
        _id: {
          type: new GraphQLNonNull(NonEmptyStringType)
        }
      },
      resolve: (parentValue, { _id }) => {
        return Customer.deactivateById(_id)
      }
    },
    addOrder: {
      type: OrderType,
      args: {
        item: {
          type: new GraphQLNonNull(NonEmptyStringType)
        },
        customerId: {
          type: new GraphQLNonNull(NonEmptyStringType)
        }
      },
      resolve: (parentValue, { item, customerId }) => {
        return Order.createOrder(item, customerId)
      }
    },
    changeOrderStatus: {
      type: OrderType,
      args: {
        _id: {
          type: new GraphQLNonNull(NonEmptyStringType)
        },
        status: {
          type: OrderStatusInputType
        }
      },
      resolve: (parentValue, { _id, status }) => {
        return Order.setOrderStatus(_id, status)
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default Schema
