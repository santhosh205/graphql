import mongoose from 'mongoose'

const CustomerSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  age: {
    type: Number
  },
  password: {
    type: String
  }
})

const Customer = mongoose.model('Customer', CustomerSchema)

const customerResolvers = {
  createCustomer: (name, email, age, password) => {
    const newCustomer = new Customer({
      name: name,
      email: email,
      age: age,
      password: password
    })
    return newCustomer.save().then((customer) => {
      return {
        _id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        age: customer.age
      }
    })
  },
  getAllCustomers: () => {
    return Customer.find({}, { password: 0 }).then((customers) => {
      return customers.map((customer) => {
        return {
          _id: customer._id.toString(),
          name: customer.name,
          email: customer.email,
          age: customer.age
        }
      })
    })
  },
  getCustomerById: (_id) => {
    return Customer.findById(_id, { password: 0 }).then((customer) => {
      return {
        _id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        age: customer.age
      }
    })
  }
}

export default customerResolvers
