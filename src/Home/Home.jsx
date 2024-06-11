import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from '../getdata';
import { useNavigate } from "react-router";


function Home() {
    const [employees, setEmployees] = useState(getData("employees"));
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');

    let navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDelete = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
    }

    const handleSort = (type,key) =>{
        let sorted;
        switch(type){
            case "asc":
                sorted = [...filteredEmployees].sort((a, b) => a[key].localeCompare(b[key]));
                break;
            case "dsc":
                sorted = [...filteredEmployees].sort((a, b) => b[key].localeCompare(a[key]));
                break;    
        }
        setFilteredEmployees(sorted);
    }

    const handleFilterChange = (e) => {
        setSearchQuery(e.target.value);
        filterEmployees(e.target.value);
    }

    const filterEmployees = (query) => {
        const filtered = employees.filter(employee =>
            employee.name.toLowerCase().includes(query.toLowerCase()) ||
            employee.age.toString().includes(query.toLowerCase()) ||
            employee.department.toLowerCase().includes(query.toLowerCase()) ||
            employee.position.toLowerCase().includes(query.toLowerCase()) ||
            employee.salary.toString().includes(query.toLowerCase()) ||
            employee.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmployees(filtered);
    }

    useEffect(() => {
        filterEmployees(searchQuery);
    }, [searchQuery]); 

    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-4">Employee List</h2>
                <div className="mb-3">
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={handleFilterChange} className="form-control" />
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name
                                <button className="btn btn-success py-0 px-1 mx-1" onClick={()=>handleSort("asc","name")}>+</button>
                                <button className="btn btn-success py-0 px-1" onClick={()=>handleSort("dsc","name")}>-</button>
                            </th>
                            <th>Age
                                <button className="btn btn-success py-0 px-1 mx-1" onClick={()=>handleSort("asc","age")}>+</button>
                                <button className="btn btn-success py-0 px-1" onClick={()=>handleSort("dsc","age")}>-</button>
                            </th>
                            <th>Department
                                <button className="btn btn-success py-0 px-1 mx-1" onClick={()=>handleSort("asc","department")}>+</button>
                                <button className="btn btn-success py-0 px-1" onClick={()=>handleSort("dsc","department")}>-</button>
                            </th>
                            <th>Position
                                <button className="btn btn-success py-0 px-1 mx-1" onClick={()=>handleSort("asc","position")}>+</button>
                                <button className="btn btn-success py-0 px-1" onClick={()=>handleSort("dsc","position")}>-</button>
                            </th>
                            <th>Salary
                                <button className="btn btn-success py-0 px-1 mx-1" onClick={()=>handleSort("asc","salary")}>+</button>
                                <button className="btn btn-success py-0 px-1" onClick={()=>handleSort("dsc","salary")}>-</button>
                            </th>
                            <th>Email
                                <button className="btn btn-success py-0 px-1 mx-1" onClick={()=>handleSort("asc","email")}>+</button>
                                <button className="btn btn-success py-0 px-1" onClick={()=>handleSort("dsc","email")}>-</button>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredEmployees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary me-3" onClick={() => handleEdit(employee.id)}>Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
                                        <Link to={`/view/${employee.id}`} className="btn btn-success ms-3">View</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home;
