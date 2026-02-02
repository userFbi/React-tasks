import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ApiCalling810 = () => {

    const token = "bys3X5KmFdZN57ba"

    const [data, setData] = useState([])

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




    return (
        <div>

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

export default ApiCalling810
