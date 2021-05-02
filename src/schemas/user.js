import Joi from 'joi'

const firstName = Joi.string().max(254).required().label('FirstName')
const lastName = Joi.string().max(254).required().label('LastName')
const userName = Joi.string().alphanum().min(3).max(30).required().label('UserName')
const email = Joi.string().email().required().label('Email')
const password = Joi.string().min(8).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).required().label('Password').options({
  language: {
    string: {
      regex: {
        base: 'must have at least one lowercase letter, one uppercase letter, and one digit.'
      }
    }
  }
})

export const signUp = Joi.object().keys({
  // email, userName, name, password
  firstName, lastName, userName, email, password
})

export const signIn = Joi.object().keys({
  email, password
})
