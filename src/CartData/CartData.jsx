import React, { useState } from 'react';
import { useFormik } from 'formik';

const CartData = () => {

    const [list, setList] = useState([])

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: (values, { resetForm }) => {
            setList(prev => [...prev, values]);
            resetForm()
        },
    });
    return (

        <>
            <form onSubmit={formik.handleSubmit}>
                <br /><br />
                <label htmlFor="firstName">First Name</label>
                <input
                    required
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                <br /><br />
                <label htmlFor="lastName">Last Name</label>
                <input
                    required
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                <br /><br />
                <label htmlFor="email">Email Address</label>
                <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                /><br /><br />

                <button type="submit">Submit</button>
            </form>

            {
                list.map((i, index) => (
                    <table border={1}>
                        <thead>
                            <tr >
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={index}>
                                <td>{i.firstName}</td>
                                <td>{i.lastName}</td>
                                <td>{i.email}</td>
                            </tr>
                        </tbody>
                    </table>
                ))
            }
        </>
    );
};
export default CartData