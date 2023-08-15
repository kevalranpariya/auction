import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import { hashSync } from 'bcrypt';
import multer from 'multer';

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
  declare upload:any;
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
      msg: 'Username must be unique'
    }
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: {
      name: 'EmailUniqueConstraint',
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
  }
},{
  sequelize,
  tableName: 'User'
});

const storage = multer.diskStorage({
  filename: (req,file,cb)=>{
    cb(null,file.path+ '/'+file.originalname);
  },
});
const upload = multer({ storage: storage }).single('file');

User.prototype.upload = upload;

export default User;