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
            setList(JSON.stringify(values, null, 2));
            resetForm()
        },
    });
    return (
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


        // {
        //     list.map((i,index)=> {

        //     })
        // }

    );
};
export default CartData