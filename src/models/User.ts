import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import { hashSync } from 'bcrypt';

class User extends Model{
  declare id:number;
  declare username:string;
  declare email:string;
  declare password:string;
  declare verify: boolean;
  declare name:string;
  declare number:number;
  declare avatar:string;
  declare role:string;
  declare payment:string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: {
      name: '',
      msg: 'Username must be unique'
    }
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: {
      name: '',
      msg: 'Email address must be unique',
    },
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(),
    validate: {
      is: /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()_+{}]).{8,16}$/,
      set(this:any, value: string) {
        this.setDataValue('password', hashSync(value, 10));
      }
    }
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  name: {
    type: DataTypes.STRING(50),
  },
  number: {
    type: DataTypes.BIGINT,
  },
  avatar: DataTypes.STRING(),
  role: {
    type: DataTypes.ENUM,
    values: [ 'User','Seller' ]
  },
  payment: {
    type: DataTypes.ENUM,
    values: [ 'UPI','credit cards',' debit cards','PayPal' ]
  }
},{
  sequelize,
  tableName: 'User'
});

export default User;