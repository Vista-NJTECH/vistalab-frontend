import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    // Perform login logic here
    // If login is successful, redirect to the home page
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
      <label>
        Email:
        <input type="email" name="email" ref={register({ required: true })} />
      </label>
      {errors.email && <p>Email is required</p>}
      <br />
      <label>
        Password:
        <input type="password" name="password" ref={register({ required: true })} />
      </label>
      {errors.password && <p>Password is required</p>}
      <br />
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login
