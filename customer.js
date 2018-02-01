import mongoose from 'mongoose'

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  status: {
    type: Boolean,
    default: true
  }
})

const Customer = mongoose.model('Customer', CustomerSchema)

const CustomerObject = (data) => {
  return {
    _id: data._id.toString(),
    name: data.name,
    email: data.email,
    age: data.age,
    status: data.status
  }
}

const customerResolvers = {
  createCustomer: (customerData) => {
    const newCustomer = new Customer(customerData)
    return newCustomer.save().then((data) => {
      return CustomerObject(data)
    })
  },
  getActiveAccounts: () => {
    return Customer.find({ status: true }).then((customers) => {
      return customers.map((data) => {
        return CustomerObject(data)
      })
    })
  },
  getDeactivatedAccounts: () => {
    return Customer.find({ status: false }).then((customers) => {
      return customers.map((data) => {
        return CustomerObject(data)
      })
    })
  },
  getAllCustomers: () => {
    return Customer.find({}).then((customers) => {
      return customers.map((data) => {
        return CustomerObject(data)
      })
    })
  },
  getCustomerById: (_id) => {
    return Customer.findById(_id).then((data) => {
      return CustomerObject(data)
    })
  },
  updateCustomerById: (_id, updatePatch) => {
    return Customer.findByIdAndUpdate(_id, { $set: updatePatch }, { new: true }).then((data) => {
      return CustomerObject(data)
    })
  },
  deactivateById: (_id) => {
    return Customer.findByIdAndUpdate(_id, { $set: { status: false } }, { new: true }).then((data) => {
      return CustomerObject(data)
    })
  }
}

export default customerResolvers
