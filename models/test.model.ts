export default (sequelize:any, Sequelize:any) => {
    const Test = sequelize.define("test", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
        },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Test;
};