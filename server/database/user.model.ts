import { Sequelize, DataTypes } from 'sequelize';

export const UserModel = (sequelize: Sequelize) => sequelize.define('user', {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
});