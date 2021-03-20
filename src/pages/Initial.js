import React from 'react'
import { Link } from 'react-router-dom'

const Initial = () => {
  return (
    <div>
      <h1>Welcome to Instagram</h1>
      <Link to="/login" ><button>Log in</button></Link>
      <Link to="/signup" ><button>Sign up</button></Link>
    </div>
  )
}

export default Initial
