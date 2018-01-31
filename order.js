import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
  item: {
    type: String
  },
  customerId: {
    type: String
  }
})

const Order = mongoose.model('Order', OrderSchema)

const orderResolvers = {
  createOrder: (item, customerId) => {
    const newOrder = new Order({
      item: item,
      customerId: customerId
    })
    return newOrder.save().then((order) => {
      return {
        _id: order._id.toString(),
        item: order.item,
        customerId: order.customerId
      }
    })
  },
  getAllOrders: () => {
    return Order.find({}).then((orders) => {
      return orders.map((order) => {
        return {
          _id: order._id.toString(),
          item: order.item,
          customerId: order.customerId
        }
      })
    })
  },
  getOrdersByCustomerId: (customerId) => {
    return Order.find({ customerId: customerId }).then((orders) => {
      return orders.map((order) => {
        return {
          _id: order._id.toString(),
          item: order.item,
          customerId: order.customerId
        }
      })
    })
  },
  getOrderById: (_id) => {
    return Order.findById(_id).then((order) => {
      return {
        _id: order._id.toString(),
        item: order.item,
        customerId: order.customerId
      }
    })
  }
}

export default orderResolvers
