import React, { useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik'
import { todoSchema } from '../../Utilities/validationSchema'
import axios from 'axios'

export default function TodoForm(props) {

    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`https://localhost:7029/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo) {
            const TodoToCreate = values

            axios.post(`https://localhost:7029/api/ToDos`, TodoToCreate).then(() => {
                props.getTodos()
                props.setShowCreate(false)
            })
        }
        else {
            const todoToEdit = {
                todoId: props.todo.toDoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7029/api/ToDos/${props.todo.toDoId}`, todoToEdit).then(() => {
                props.getTodos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',
            done: props.done ? props.todo.done : false,
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {({errors, touched}) => (
            <Form id='TodoForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[--Please Choose--]</option>
    
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>Submit To-do!</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
