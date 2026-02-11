import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import "./ProductCardApi.css"

const ProductCardApi = () => {

    const token = "pgodQcYTwqv0Sofx"
    const [ini, setIni] = useState({
        ProductName: "",
        ProductImageUrl: "",
        ProductDiscountedPrice: "",
        ProductRealPrice: "",
    })
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)

    const handleSubmit = (values, { resetForm }) => {
        const { _id, ...others } = values

        if (editId != null) {
            axios.patch(`https://generateapi.techsnack.online/api/Ecommerce/${editId}`, others, {
                headers: {
                    Authorization: token
                }
            })
                .then(() => {
                    console.log("Data Updated");
                    dataView()
                    setIni({
                        ProductName: "",
                        ProductImageUrl: "",
                        ProductDiscountedPrice: "",
                        ProductRealPrice: "",
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        else {
            axios.post("https://generateapi.techsnack.online/api/Ecommerce", values, {
                headers: {
                    Authorization: token
                }
            })
                .then(() => {
                    console.log("Data added successfully");
                    resetForm()
                    dataView()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
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

    const handleDelete = (id) => {
        axios.delete(`https://generateapi.techsnack.online/api/Ecommerce/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log("Data Deleted");
                dataView()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleEdit = (data) => {
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
                <Form><br /><br />
                    <Field type="text" required name="ProductName" placeholder="Enter Product Name" /><br /><br />
                    <Field type="text" required name="ProductImageUrl" placeholder="Enter Product link" /><br /><br />
                    <Field type="number" required name="ProductRealPrice" placeholder="Enter Product Price" /><br /><br />
                    <Field type="number" required name="ProductDiscountedPrice" placeholder="Enter Disconted Price " /><br /><br />
                    <button type='submit'>submit</button><br /><br />
                </Form>
            </Formik>
            <div className="card-grid">
                {data.map((item, index) => (
                    <div className="product-card" key={index}>
                        <img
                            src={item.ProductImageUrl}
                            alt={item.ProductName}
                        />

                        <h3>{item.ProductName}</h3>
                        <div className="flex">
                            <p className="final-price">₹{item.ProductDiscountedPrice}</p>
                            <p className="real-price">₹{item.ProductRealPrice}</p>
                        </div>

                        <div className="card-actions">
                            <button className="edit-btn" onClick={() => handleEdit(item)}>
                                Update
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCardApi