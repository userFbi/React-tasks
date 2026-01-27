import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./productcards.css";

const ProductCards = () => {
    const [products, setProducts] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            realPrice: "",
            finalPrice: "",
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.get(values.image);

                if (editIndex !== null) {
                    const updated = [...products];
                    updated[editIndex] = values;
                    setProducts(updated);
                    setEditIndex(null);
                } else {
                    setProducts([...products, values]);
                }

                resetForm();
            } catch {
                alert("Invalid Image URL");
            }
        },
    });

    const handleEdit = (index) => {
        setEditIndex(index);
        formik.setValues(products[index]);
    };

    const handleDelete = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            {/* FORM */}
            <form className="product-form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" {...formik.getFieldProps("name")} required />
                </div>

                <div className="form-group">
                    <label>Product Image URL</label>
                    <input type="text" {...formik.getFieldProps("image")} required />
                </div>

                <div className="form-group">
                    <label>Real Price</label>
                    <input type="number" {...formik.getFieldProps("realPrice")} required />
                </div>

                <div className="form-group">
                    <label>Discounted Price</label>
                    <input type="number" {...formik.getFieldProps("finalPrice")} required />
                </div>

                <button className="submit-btn" type="submit">
                    {editIndex !== null ? "Update Product" : "Add Product"}
                </button>
            </form>

            {/* CARDS */}
            <div className="card-grid">
                {products.map((item, index) => (
                    <div className="product-card" key={index}>
                        <img src={item.image} alt={item.name} />

                        <h3>{item.name}</h3>
                        <div className="flex">
                            <p className="final-price">₹{item.finalPrice}</p>
                            <p className="real-price">₹{item.realPrice}</p>
                        </div>

                        <div className="card-actions">
                            <button className="edit-btn" onClick={() => handleEdit(index)}>
                                Update
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCards;
