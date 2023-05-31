import React, { createContext, useState } from 'react'

export const NavbarContext = createContext()

export const NavBarProvider = ({ children }) => {
  const [reRender, setRender] = useState(false)

  const setReRender = (value) => {
    setRender(value)
    console.log('forcing navbar re-render!')
  }

  return (
    <NavbarContext.Provider value={{ reRender, setReRender }}>
      {children}
    </NavbarContext.Provider>
  )
}
