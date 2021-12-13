module.exports = (sequelize,DataTypes) => {

    const Users = sequelize.define('Users', {
        
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        picture_img:{
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
    return Users;

}