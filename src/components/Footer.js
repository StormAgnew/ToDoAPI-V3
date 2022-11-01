import React from 'react'
import Logout from './Auth/Logout'
import { useAuth } from '../contexts/AuthContext'

export default function Footer() {
  const {currentUser} = useAuth()

  return (
    <>
      {currentUser &&
        <Logout />
      }
      <footer className='text-center text-white bg-info p-4'>
          <strong>&copy; {new Date().getFullYear()} Storm, the Cutie Bootie :TM: ;3</strong>
      </footer>
    </>
  )
}
