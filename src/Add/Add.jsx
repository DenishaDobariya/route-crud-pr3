import React, { useState, useEffect } from 'react';
import generateUniqueId from 'generate-unique-id';
import { useNavigate } from 'react-router';
import { getData } from '../getdata';

function Add() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        department: '',
        position: '',
        salary: '',
        email: ''
    });

    const [employees, setEmployees] = useState(getData('employees'));
    const [isSubmit, setIsSubmit] = useState(false);

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newEmployee = {
            ...formData,
            id: generateUniqueId({
                length: 4,
                useLetters: false
            })
        };

        setEmployees([...employees, newEmployee]);
        setIsSubmit(true);

        setFormData({
            id: '',
            name: '',
            age: '',
            department: '',
            position: '',
            salary: '',
            email: ''
        });
    };

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    useEffect(() => {
        if (isSubmit) {
            navigate('/');
        }
    }, [isSubmit]);

    return (
        <div className="container">
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Employee Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Employee Age</label>
                    <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="position" className="form-label">Position</label>
                    <input type="text" className="form-control" name="position" value={formData.position} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Add;
