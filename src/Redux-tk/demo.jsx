import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

const FormUi = () => {
    const [data, setData] = useState([])

    // Simplified initial state structure
    const [ini, setIni] = useState({
        name: "",
        surname: "",
        age: "",
    })

    const handleSubmit = (values, { resetForm }) => {
        setData([...data, values]);

        // Reset Formik's internal state
        resetForm();

        // Optional: Reset your custom state setter correctly
        setIni({
            name: "",
            surname: "",
            age: "",
        });
    }

    const handleDelete = (index) => {
        const filteredData = data.filter((_, i) => i !== index);
        setData(filteredData);
    }

    return (
        <>
            <h1>Crud with Local State</h1>
            <Formik
                initialValues={ini}
                enableReinitialize={true} // Important when initialValues come from state
                onSubmit={handleSubmit}
            >
                <Form><br />
                    <Field type='text' name='name' placeholder='Enter your name' /><br /><br />
                    <Field type='text' name='surname' placeholder='Enter your surname' /><br /><br />
                    <Field type='number' name='age' placeholder='Enter your age' /><br /><br />
                    <button type='submit'>Submit</button><br /><br /><hr />
                </Form>
            </Formik>

            <table border={1} cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.age}</td>
                            <td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default FormUi;