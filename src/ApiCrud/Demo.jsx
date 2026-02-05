import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

const Demo = () => {

    // https://myapigenerator.onrender.com/api/user

    const token = "bys3X5KmFdZN57ba"
    const [data, setData] = useState([])

    function viewData() {
        axios.get("https://myapigenerator.onrender.com/api/user", {
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

    const deleteData = (id) => {
        axios.delete(`https://generateapi.techsnack.online/api/user/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                console.log("Data Deleted Successfully");
                viewData()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <Formik>
                <Form><br /><br />
                    <Field type="text" name="username" placeholder="Enter Name"></Field> <br /><br />
                    <Field type="password" name="password" placeholder="Enter Password"></Field> <br /><br />
                </Form>
            </Formik>


            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
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
                                <td><button onClick={deleteData(i._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Demo