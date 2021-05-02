import mongoose, { Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    validate: {
      validator: userName => User.doesntExist({ userName }),
      message: 'Username has already been taken.'
    }
  },
  email: {
    type: String,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: 'Email has already been taken.'
    }
  },
  password: String,
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
