import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import axios from 'axios'
import CatEdit from './CatEdit'

export default function SingleCategory(props) {
  const {currentUser} = useAuth()

  //hook to display the edit modal
  const [showEdit, setShowEdit] = useState(false)
  
  //below is our logic for delete
  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)) {
        axios.delete(`https://localhost:7029/api/Categories/${id}`).then(() => {props.getCategories()})
    }
  }

  return (
    <tr>
        <td>{props.category.catName}</td>
        <td>{props.category.catDesc}</td>
        {/* EDIT UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <td>
            <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
              <FaTrashAlt/>
            </button>
            {showEdit &&
              <CatEdit
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                getCategories={props.getCategories}
                category={props.category}
                />
            }
          </td>
        }
        {/* END OF EDIT UI */}
    </tr>
  )
}
