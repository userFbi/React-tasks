import axios from 'axios';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const Demo = () => {

    const token = "bys3X5KmFdZN57ba"
    const [data, setData] = useState([])
    const [ini, setIni] = useState({
        username: "",
        password: ""
    })

    useEffect(() => {
        dataView()
    }, [])

    function dataView() {
        axios.get('https://myapigenerator.onrender.com/api/user', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                setData(res.data.Data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSubmit = (values, { resetForm }) => {
        axios.post('https://generateapi.techsnack.online/api/user', values, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                console.log("Data Entered Successfully");
                dataView()
                resetForm()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteData(id) {
        axios.delete(`https://generateapi.techsnack.online/api/user/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log("Data Deleted");
                dataView();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                <Form><br /><br />
                    <Field type='text' name='username'></Field><br /><br />
                    <Field type='password' name='password'></Field><br /><br />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik >
            <table border={1}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((i, index) => (
                            <tr key={index}>
                                <td>{i.username}</td>
                                <td>{i.password}</td>
                                <td><button onClick={() => deleteData(i._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Demo