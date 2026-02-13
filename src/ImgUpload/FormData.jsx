import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const FormData = () => {

    const token = "xy8fn8IsmAmPf3mo"
    const [data, setData] = useState([])
    const [ini, setIni] = useState({
        name: "",
        image: "",
    })

    function dataView() {
        axios.get("https://generateapi.techsnack.online/api/test", {
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

    useEffect(() => {
        dataView()
    }, [])


    const handleSubmit = (values, { resetForm }) => {

        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("image", values.image)

        axios.post("https://generateapi.techsnack.online/api/test", formData, {
            headers: {
                Authorization: token,
            }
        }).then((res) => {
            setData(res.data.Data)
            setIni({
                name: "",
                image: null,
            })
            resetForm()
            dataView()
        })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>File Upload</h1>
            <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <Field type='text' name="name" required placeholder="Enter Product Name" /> <br /><br />
                        <input
                            type='file'
                            required
                            onChange={(e) =>
                                setFieldValue("image", e.target.files[0])
                            }
                            name="image"
                        /><br /><br />

                        <button type='submit'>Submit</button><br /><br />
                    </Form>
                )}
            </Formik>

            {
                data.map((i, index) => (
                    <div className='card' key={index}>
                        <img src={i.image} alt={i.name} />
                        <h3>{i.name}</h3>
                    </div>
                ))
            }
        </div>
    )
}

export default FormData