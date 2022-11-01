import React, {useState} from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import TodoEdit from './TodoEdit'


export default function SingleTodo(props) {
  const {currentUser} = useAuth()
  const [showEdit, setShowEdit] = useState(false);
  const deleteTodo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)) {
        axios.delete(`https://localhost:7029/api/ToDos/${id}`).then(() => {props.getTodos()})
    }
  }



  return (
    <div className='singleToDo col-md-5 m-4'>
        {/* EDIT UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div>
            <button id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteTodo(props.todo.toDoId)}>
              <FaTrashAlt/>
            </button>
            {showEdit &&
              <TodoEdit
                todo={props.todo}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                getTodos={props.getTodos} />
            }
          </div>
          }

          <h3>{props.todo.name}</h3>
          {props.todo.done !== true ?
              <p>This task is incomplete!</p> :
              <p>This task is complete! :D</p>
          }

    </div>
  )
}
