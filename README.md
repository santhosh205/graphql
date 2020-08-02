# graphql

A simple GraphQL setup and working application

> localhost:4000/graphql

## Schema

```

customer = {
  _id: String,
  name: String,
  email: String,
  age: Int,
  password: String,
  status: Boolean
}

order = {
  _id: String,
  item: String,
  customerId: String,
  status: {
    String,
    Enum([ 'PLACED', 'CONFIRMED', 'INTRANSIT', 'DELIVERED', 'CANCELLED' ]),
    default: 'PLACED'
  }
}

```

## Mutations

All inputs should be non-empty

```

mutation {

  addCustomer(input: {
    name: // Required
    email: // Optional
    age: // Optional
    password: // Required
  })

  updateCustomer(_id, input: {
    name // optional
    email // optional
    age // optional
  })

  deactivateAccount(_id)

  addOrder(item, customerId)

  changeOrderStatus(_id, newStatus)

}

```

## Root Queries

```

{

  customer(_id){
    _id
    name
    email
    age
    orders {
      _id
      item
      customerId
    }
  }

  getActiveAccounts

  getDeactivatedAccounts

  allCustomers

  order(_id){
    _id
    item
    customerId
  }

  getOrdersByStatus(status)

  allOrders

}

```

> Passsword should have atleast 6 characters, 1 number, 1 lowercase letter, 1 uppercase letter and no spaces

## Actions to be completed

> MongoDB acknowledgement and error handling to display corresponding messages
