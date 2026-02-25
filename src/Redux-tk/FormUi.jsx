import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { addUser, deleteUser, editUser } from './FormSlice'
import { useDispatch, useSelector } from 'react-redux'

const FormUi = () => {

    const dis = useDispatch()
    const users = useSelector((state) => state.users.users)
    const [editId, setEditId] = useState(null)
    const [ini, setIni] = useState({
        name: "",
        age: ""
    })

    const handleSubmit = (values, { resetForm }) => {

        if (editId !== null) {
            dis(editUser({ index: editId, data: values }))
            setEditId(null)
            setIni({
                name: "",
                age: ""
            })
        }
        else {
            dis(addUser(values))
        }
        resetForm()
    }

    const handleEdit = (data, index) => {
        setIni(data)
        setEditId(index)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                onSubmit={handleSubmit}
                initialValues={ini}>
                <Form>
                    <br /><br />
                    <Field type='text' name='name' placeholder='Enter your name' /><br /><br />
                    <Field type='number' name='age' placeholder='Enter your age' /><br /><br />
                    <button type='submit'>submit</button><br /><br />
                </Form>
            </Formik>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td><button onClick={() => dis(deleteUser(index))}>Delete</button></td>
                                <td><button onClick={() => handleEdit(item, index)}
                                >Edit</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FormUi