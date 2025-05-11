
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import TodoList from './todoList'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TodoList/>
  </StrictMode>,
)
