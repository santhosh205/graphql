import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [ 'PLACED', 'CONFIRMED', 'INTRANSIT', 'DELIVERED', 'CANCELLED' ],
    default: 'PLACED'
  }
})

const Order = mongoose.model('Order', OrderSchema)

const OrderObject = (data) => {
  return {
    _id: data._id.toString(),
    item: data.item,
    customerId: data.customerId,
    status: data.status
  }
}

const orderResolvers = {
  createOrder: (item, customerId) => {
    const newOrder = new Order({
      item: item,
      customerId: customerId
    })
    return newOrder.save().then((data) => {
      return OrderObject(data)
    })
  },
  setOrderStatus: (_id, newStatus) => {
    return Order.findByIdAndUpdate(_id, { $set: { status: newStatus } }, { new: true }).then((data) => {
      return OrderObject(data)
    })
  },
  getOrdersByStatus: (status) => {
    return Order.find({ status: status }).then((orders) => {
      return orders.map((data) => {
        return OrderObject(data)
      })
    })
  },
  getAllOrders: () => {
    return Order.find({}).then((orders) => {
      return orders.map((data) => {
        return OrderObject(data)
      })
    })
  },
  getOrdersByCustomerId: (customerId) => {
    return Order.find({ customerId: customerId }).then((orders) => {
      return orders.map((data) => {
        return OrderObject(data)
      })
    })
  },
  getOrderById: (_id) => {
    return Order.findById(_id).then((data) => {
      return OrderObject(data)
    })
  }
}

export default orderResolvers
