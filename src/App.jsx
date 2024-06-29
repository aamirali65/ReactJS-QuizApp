import React from 'react'
import MainHome from './components/main'
import { Route, Routes } from 'react-router-dom'
import Result from './components/result'
import IndexPage from './components/home'

const App = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<IndexPage/>}></Route>
    <Route path='/home' element={<MainHome/>}></Route>
    <Route path='/result' element={<Result/>}></Route>
    </Routes>
    </>
    )
}

export default App