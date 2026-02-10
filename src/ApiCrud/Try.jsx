import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const Try = () => {

    const token = "pgodQcYTwqv0Sofx"
    const [ini, SetIni] = useState({
        ProductName: "",
        ProductImageUrl: "",
        ProductRealPrice: "",
        ProductDiscountedPrice: "",
    })
    const [data, setData] = useState([])

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        axios.post("https://generateapi.techsnack.online/api/Ecommerce", values, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                console.log("Data added successfully");

                resetForm()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function dataView() {
        axios.get("https://generateapi.techsnack.online/api/Ecommerce", {
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

    return (
        <div>
            <Formik
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                <Form><br /><br />
                    <Field type="text" name="ProductName" /><br /><br />
                    <Field type="text" name="ProductImageUrl" /><br /><br />
                    <Field type="number" name="ProductRealPrice" /><br /><br />
                    <Field type="number" name="ProductDiscountedPrice" /><br /><br />
                    <button type='submit'>submit</button>
                </Form>
            </Formik>
            <div className="card-grid">
                {data.map((item, index) => (
                    <div className="product-card" key={index}>
                        <img src={item.image} alt={item.name} />

                        <h3>{item.name}</h3>
                        <div className="flex">
                            <p className="final-price">₹{item.finalPrice}</p>
                            <p className="real-price">₹{item.realPrice}</p>
                        </div>

                        {/* <div className="card-actions">
                            <button className="edit-btn" onClick={() => handleEdit(index)}>
                                Update
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Try