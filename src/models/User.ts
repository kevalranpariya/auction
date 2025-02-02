import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import { hashSync } from 'bcrypt';
import { notAssignMessage } from '../utils/messages';

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
  declare token:string;
  declare public_id_image:string;
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
      name: 'UsernameUniqueConstraint',
      msg: notAssignMessage('username')
    }
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: {
      name: 'EmailUniqueConstraint',
      msg: notAssignMessage('email'),
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
    unique: {
      name: 'numberUniqueConstraint',
      msg: notAssignMessage('Number')
    },
    validate: {
      set(value:any) {
        if (value.toString().length !== 10) {
          throw new Error('Number must be exactly 10 digits.');
        }
      },
    }
  },
  avatar: DataTypes.STRING(),
  role: {
    type: DataTypes.ENUM,
    values: [ 'User','Seller' ]
  },
  payment: {
    type: DataTypes.ENUM,
    values: [ 'UPI','credit cards',' debit cards','PayPal' ]
  },
  token: {
    type: DataTypes.STRING
  },
  public_id_image: DataTypes.STRING
},{
  sequelize,
  tableName: 'User'
});

export default User;