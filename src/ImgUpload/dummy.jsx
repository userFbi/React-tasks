import axios from "axios";
import React, { useState } from "react";
import { Formik, Form } from "formik";

const Dummy = () => {
    const token = "CniYmaavXxOR7aq1";

    const [data, setData] = useState([]);

    const handleSubmit = (values, { resetForm }) => {
        const formData = new FormData();
        formData.append("productName", values.productName);
        formData.append("image", values.image);

        axios
            .post(
                "https://generateapi.techsnack.online/api/demoData",
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((res) => {
                const apiData = res.data?.Data;

                if (Array.isArray(apiData)) setData(apiData);
                else if (apiData) setData([apiData]);
                else setData([]);

                resetForm();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add Product</h2>

            {/* FORM */}
            <Formik
                initialValues={{ productName: "", image: null }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form style={styles.form}>
                        <input
                            type="text"
                            placeholder="Product Name"
                            style={styles.input}
                            required
                            onChange={(e) =>
                                setFieldValue("productName", e.target.value)
                            }
                        />

                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) =>
                                setFieldValue("image", e.target.files[0])
                            }
                        />

                        <button type="submit" style={styles.btn}>
                            Add
                        </button>
                    </Form>
                )}
            </Formik>

            {/* CARD GRID */}
            <div style={styles.grid}>
                {Array.isArray(data) &&
                    data.map((item, index) => (
                        <div key={index} style={styles.card}>
                            <img
                                src={item.image}
                                alt=""
                                style={styles.image}
                            />
                            <p style={styles.name}>{item.productName}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dummy;

/* ---------------- STYLES ---------------- */

const styles = {
    container: {
        padding: "40px",
        fontFamily: "sans-serif",
        background: "#f7f7f7",
        minHeight: "100vh",
    },

    title: {
        marginBottom: "20px",
    },

    form: {
        display: "flex",
        gap: "10px",
        marginBottom: "40px",
        flexWrap: "wrap",
    },

    input: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ddd",
    },

    btn: {
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        background: "#222",
        color: "#fff",
        cursor: "pointer",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "20px",
    },

    card: {
        background: "#fff",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        textAlign: "center",
    },

    image: {
        width: "100%",
        height: "120px",
        objectFit: "cover",
        borderRadius: "8px",
    },

    name: {
        marginTop: "10px",
        fontWeight: "500",
    },
};
