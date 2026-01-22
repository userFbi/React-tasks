import React, { useState } from "react";

const StudentResult = () => {

  const [name, setName] = useState("");
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");   // <-- NEW

  const handleSubmit = () => {

    const m1 = Number(sub1);
    const m2 = Number(sub2);
    const m3 = Number(sub3);

    const total = m1 + m2 + m3;
    const min = Math.min(m1, m2, m3);
    const max = Math.max(m1, m2, m3);
    const percentage = (total / 300) * 100;

    const obj = { name, m1, m2, m3, total, min, max, percentage };

    if (editId !== null) {
      let copy = [...list];
      copy[editId] = obj;
      setList(copy);
      setEditId(null);
    } else {
      setList([...list, obj]);
    }

    setName("");
    setSub1("");
    setSub2("");
    setSub3("");
  };

  const deleteData = (index) => {
    let copy = [...list];
    copy.splice(index, 1);
    setList(copy);
  };

  const editData = (item, index) => {
    setName(item.name);
    setSub1(item.m1);
    setSub2(item.m2);
    setSub3(item.m3);
    setEditId(index);
  };

  // Filtered list based on search
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <br /><br />
      <input className="temp"
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> <br /><br />

      <input className="temp"
        type="number"
        placeholder="Subject 1"
        value={sub1}
        onChange={(e) => setSub1(e.target.value)}
      /> <br /><br />

      <input className="temp"
        type="number"
        placeholder="Subject 2"
        value={sub2}
        onChange={(e) => setSub2(e.target.value)}
      /> <br /><br />

      <input className="temp"
        type="number"
        placeholder="Subject 3"
        value={sub3}
        onChange={(e) => setSub3(e.target.value)}
      /> <br /><br />

      <button className="btn" onClick={handleSubmit}>
        {editId !== null ? "UPDATE" : "SUBMIT"}
      </button>

      <br /><br />

      <input
        className="btn"
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /><br /><br />

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>M1</th>
            <th>M2</th>
            <th>M3</th>
            <th>Total</th>
            <th>Min</th>
            <th>Max</th>
            <th>Percentage</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {filteredList.map((i, index) => (
            <>
              <tr key={index}>
                <td>{i.name}</td>
                <td>{i.m1}</td>
                <td>{i.m2}</td>
                <td>{i.m3}</td>
                <td>{i.total}</td>
                <td>{i.min}</td>
                <td>{i.max}</td>
                <td>{i.percentage.toFixed(2)}%</td>
                <td>
                  <button onClick={() => deleteData(index)}>DELETE</button>
                </td>
                <td>
                  <button onClick={() => editData(i, index)}>EDIT</button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

    </div >
  );
};

export default StudentResult;
