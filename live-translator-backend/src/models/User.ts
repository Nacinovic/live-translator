import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt'

// Define the User schema
export interface IUser extends Document {
  username: string;
  email: string;
  language: string,
  password: string;
  _id: string,
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  password: { type: String, required: true },
}, {
  toJSON: {
    transform: (doc, ret: Record<string, any>) => {
      ret.id = doc._id
      delete ret.password
      delete ret._id
      return ret
    }
  }
});

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare the entered password with the hashed one
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;