import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import {
    Link
} from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function StudentTable() {
    const [studentList, setStudentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(2);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const saveSelected = (event, student) => {
        console.log("stu", student);
        setSelectedStudent({ ...student});
        handleShow();

    }



    useEffect(() => {
        getStudent();
        //eslint-disable-next-line
    }, [])

    const getStudent = async () => {
        let res = await axios.get("http://localhost:3000/students");
        setStudentList(res.data);
        console.log(studentList);
    }


    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentRow = studentList.slice(indexOfFirstRow, indexOfLastRow)

    const pagenumber = [];
    const totalRow = studentList.length;
    const totalPages = Math.ceil(totalRow / rowPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pagenumber.push(i);
    }

    let prev = () => {

        if (currentPage < totalRow && currentPage > 1) {
            setCurrentPage(currentPage - 1)

        }
    }
    let next = () => {
        console.log(currentPage, totalRow)
        if (currentPage < totalRow && currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (

        <div className="student-table">
            <div className="new-student-btn">
                <Link className="btn btn-primary" to="/addStudent">New Student</Link>
            </div>
            {
                studentList ?
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Phone#</th>
                                    <th>class</th>
                                    <th>Marks%</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    currentRow.map((item, i) => (
                                        <tr key={item.id}>
                                            <td>{rowPerPage * (currentPage - 1) + (i + 1)}</td>
                                            <td onClick={(event) => saveSelected(event, item)}>{item?.studentName}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.phone}</td>
                                            <td>{item?.class}</td>
                                            <td>{item?.marks}</td>
                                            <td><Link to={`/editStudent/${item.id}`}>edit</Link></td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Student Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Student Name :<b>{selectedStudent.studentName}</b> </p>
                                <p>Father's Name : <b>{selectedStudent.fatherName}</b></p>
                                <p>Age : <b>{selectedStudent.dob}</b></p>
                                <p>address : <b>{selectedStudent.address}</b></p>
                                <p>city : <b>{selectedStudent.city}</b></p>
                                <p>state : <b>{selectedStudent.state}</b></p>
                                <p>pincode : <b>{selectedStudent.pinCode}</b></p>
                                <p>phone number : <b>{selectedStudent.phone}</b></p>
                                <p>email : <b>{selectedStudent.email}</b></p>
                                <p>class : <b>{selectedStudent.class}</b></p>
                                <p>Marks % : <b>{selectedStudent.marks}</b></p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                
                            </Modal.Footer>
                        </Modal>
                        <div className="pagination d-flex align-items-center justify-content-center mt-5">
                            <button onClick={prev} className="btn btn-primary  mx-2">{"<<"}</button>
                            {currentPage} of {totalPages}
                            <button onClick={next} className="btn btn-primary mx-2">{">>"}</button>
                        </div>
                    </div>
                    :
                    <p>No Data</p>
            }

        </div>
    )
}
