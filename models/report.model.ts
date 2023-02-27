export default (sequelize : any, Sequelize: any) => {
    const Report = sequelize.define("report", {
      bapId: {
        type: Sequelize.STRING
      },
      aggregatorId: {
        type: Sequelize.STRING
      },
      sellerId: {
        type: Sequelize.STRING
      },
      requestType: {
        type: Sequelize.STRING
      },
      context: {
        type: Sequelize.STRING
      },
      addedOn: {
        type: Sequelize.DATE
      },
      updatedOn: {
        type: Sequelize.DATE
      }
    });
  
    return Report;
  };