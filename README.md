# graphqlv1

A Simple GraphQL Setup and Working Application

## Schema

```

customer = {
  _id,
  name,
  email,
  age,
  password
}

order = {
  _id,
  item,
  customerId
}

```

## Mutations

All inputs should be non-empty

```

mutation {

  addCustomer(name, email, age, password)

  addOrder(item, customerId)

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

  customers

  order(_id){
    _id
    item
    customerId
  }

  orders

}

```

> Passsword should have atleast 6 characters, 1 number, 1 lowercase letter, 1 uppercase letter and no spaces

## Actions to be completed

> Empty string inputs should throw errors
