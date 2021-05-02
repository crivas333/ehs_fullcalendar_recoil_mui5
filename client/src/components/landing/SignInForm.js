import React, { useState } from 'react'

export const SignInForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    console.log(email)
    console.log(password)
    props.signIn({ variables: { email: email, password: password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div> email
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>INICIAL SESION</button>
      </form>
      <button onClick={props.click}>REGISTRARSE</button>
    </div>
  )
}
