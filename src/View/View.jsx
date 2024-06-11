import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getData } from "../getdata";

function View() {
    const {id} = useParams();

    const[view,setView] =useState(null);

    useEffect(()=>{
        let data = getData();
        let v = data.find((d)=>{
            return d.id === id;
        })
        setView(v);
    },[id])
   
    return (
        <div className="container mt-5">
            <div className="card col-4">
                <div className="card-body">
                    <h5 className="card-title">Employee Details</h5>
                    <div className="card-text">
                    {view && (
                            <>
                                <p><strong>Name:</strong> {view.name}</p>
                                <p><strong>Age:</strong> {view.age}</p>
                                <p><strong>Department:</strong> {view.department}</p>
                                <p><strong>Position:</strong> {view.position}</p>
                                <p><strong>Salary:</strong> {view.salary}</p>
                                <p><strong>Email:</strong> {view.email}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
