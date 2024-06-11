import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getData } from '../getdata';

function Edit() {
    let { id } = useParams();

    const [formData, setFormData] = useState({
        id: id,
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

    useEffect(() => {
      const employeeToEdit = employees.find(employee => employee.id === id);
      if (employeeToEdit) {
          setFormData(employeeToEdit);
      }
    }, [id, employees]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEmployees = employees.map(employee =>
            employee.id === id ? formData : employee
        );
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setIsSubmit(true);
    };

    useEffect(() => {
      if (isSubmit) {
        navigate('/');
      }
    }, [isSubmit]);

    return (
        <>
            <div className="container">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" name="id" value={formData.id} hidden />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Employee Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Employee Age</label>
                        <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <input type="text" className="form-control" id="department" name="department" value={formData.department} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Position</label>
                        <input type="text" className="form-control" id="position" name="position" value={formData.position} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary" className="form-label">Salary</label>
                        <input type="text" className="form-control" id="salary" name="salary" value={formData.salary} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Edit;
