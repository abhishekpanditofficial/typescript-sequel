export default (sequelize : any, Sequelize: any) => {
    const Order = sequelize.define("order", {
    bapId: {
            type: Sequelize.STRING
    },
    sellerId: {
        type: Sequelize.STRING
    },
    sellerNPName: {
        type: Sequelize.STRING,
    },
    orderCreatedAt: {
        type: Sequelize.DATE,
    },
    networkOrderId: {
        type: Sequelize.STRING,
    },
    sellerNPOrderId: {
        type: Sequelize.STRING
    },
    sellerNPType: {
        type: Sequelize.STRING
    },
    OrderStatus: {
        type: Sequelize.STRING
    },
    nameOfSeller: {
        type: Sequelize.STRING
    },
    sellerPincode: {
        type: Sequelize.STRING
    },
    skuName: {
        type: Sequelize.STRING
    },
    skuCode: {
        type: Sequelize.STRING
    },
    orderCategory: {
        type: Sequelize.STRING
    },
    shippedAt: {
        type: Sequelize.DATE
    },
    deliveredAt: {
        type: Sequelize.DATE
    },
    deliveryType: {
        type: Sequelize.STRING
    },
    logisticsNetworkOrderId: {
        type: Sequelize.STRING
    },
    logisticsNetworkTransactionId: {
        type: Sequelize.STRING
    },
    deliveryCity: {
        type: Sequelize.STRING
    },
    deliveryPincode: {
        type: Sequelize.STRING
    },
    cancelledAt: {
        type: Sequelize.DATE
    },
    cancelledBy: {
        type: Sequelize.STRING
    },
    cancellationReason: {
        type: Sequelize.STRING
    },
    totalOrderValue: {
        type: Sequelize.STRING
    }
    });
  
    return Order;
};