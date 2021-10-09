import * as mongoose from 'mongoose';
import * as argon from 'argon2';

export enum UserRole {
  ADMIN = 'ADMIN',
  CONSUMER = 'CONSUMER',
}

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const StringAndRequired = {
  type: String,
  required: true,
};

const UserSchema = new mongoose.Schema(
  {
    username: { ...StringAndRequired, unique: true, lowercase: true },
    email: { ...StringAndRequired, unique: true },
    password: StringAndRequired,
    role: {
      type: String,
      required: true,
      enum: ['CONSUMER', 'ADMIN'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre<UserDoc>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await argon.hash(this.password, {
    hashLength: 12,
  });
  return next();
});

export { UserSchema };
