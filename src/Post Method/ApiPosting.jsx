import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const ApiPosting = () => {

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
                setData(res.data.Data);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleSubmit = (values, { resetForm }) => {
        // console.log(values);

        // setData([...data , values])
        axios.post('https://generateapi.techsnack.online/api/user', values, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log("data enter success");
                dataView()
                resetForm()
            })
            .catch((error) => {
                console.log(error);
            })
    }



    return (
        <div>
            <br /><br />
            <Formik
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
                <tr>
                    <td>username</td>
                    <td>password</td>
                </tr>
                {
                    data.map((i, index) => (
                        <tr>
                            <td>{i.username}</td>
                            <td>{i.password}</td>
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default ApiPosting
