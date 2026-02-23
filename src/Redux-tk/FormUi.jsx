import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser } from './FormSlice';


const FormUi = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    // Get data and dispatch function from Redux
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !age) return;

        dispatch(addUser({ name, age })); // Send data to Redux
        setName(''); // Clear inputs
        setAge('');
    };

    return (
        <div >
            <h2>Simple Redux CRUD</h2>

            <form onSubmit={handleAdd}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> <br /><br />
                <input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} /><br /><br />
                <button type="submit">Add</button><br /><br />
            </form>

            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>
                                <button onClick={() => dispatch(deleteUser(index))}>Delete</button>
                            </td>
                            <td>
                                {/* <button onClick={() => dispatch(editeUser(index))}>Edit</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormUi; 