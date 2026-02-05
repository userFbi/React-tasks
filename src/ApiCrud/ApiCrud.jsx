import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const ApiCrud = () => {

    const token = "bys3X5KmFdZN57ba"
    const [data, setData] = useState([])
    const [ini, setIni] = useState({
        username: "",
        password: ""
    })

    const [editId, setEditId] = useState(null)

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
                setData(res.data.Data);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleSubmit = (values, { resetForm }) => {
        console.log(values);

        const { _id, ...rest } = values

        // setData([...data , values])

        if (editId != null) {
            axios.patch(`https://generateapi.techsnack.online/api/user/${editId}`, rest, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    console.log("data update success");
                    dataView()
                    setIni({
                        username: "",
                        password: ""
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            axios.post('https://generateapi.techsnack.online/api/user', values, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    alert("Data Entered successfully");
                    dataView()
                    resetForm()
                })
                .catch((error) => {
                    console.log(error);
                })
        }


    }

    const deleteData = (id) => {
        // console.log(id);
        // axios.delete('https://generateapi.techsnack.online/api/user/' + id)
        axios.delete(`https://generateapi.techsnack.online/api/user/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                alert("Data Deleted Successfully");
                dataView()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editData = (data) => {
        setIni(data)
        setEditId(data._id)
    }



    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field type="text" name="username"></Field> <br /><br />
                    <Field type="password" name="password"></Field> <br /><br />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>

            <table border={1}>
                <thead>
                    <tr>
                        <td>username</td>
                        <td>password</td>
                        <td>DELETE</td>
                        <td>UPDATE</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((i, index) => (
                            <tr key={index}>
                                <td>{i.username}</td>
                                <td>{i.password}</td>
                                <td>
                                    <button onClick={() => deleteData(i._id)}>DELETE</button>
                                </td>
                                <td>
                                    <button onClick={() => editData(i)}>EDIT</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ApiCrud
