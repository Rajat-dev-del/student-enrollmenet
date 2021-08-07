import axios from 'axios';
import React , {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Header from './Header'

export default function AddStudent() {
    const history = useHistory();
    const [studentList, setStudentList] = useState([]);

    const [enrollForm , setEnrollForm] = useState({
        studentName : "",
        fatherName : "",
        dob : "",
        address : "",
        city : "",
        state : "",
        pinCode : "",
        phone : "",
        email : "",
        class : "",
        marks : "",
    });
    
   const onSubmit = async(e) =>{
        e.preventDefault();
       
        console.log("form value", enrollForm)
        if(parseInt(enrollForm.dob, 10)<10) {
            alert("age must be grater then 10");
            return false;
        } else if (parseInt(enrollForm.pinCode) < 100000 ){
            alert("pincode must be 6 digit Number")
            return false;
        } else if(parseInt(enrollForm.pinCode)>999999) {
            alert("pincode must be 6 digit Number")
            return false
        } else if(parseInt(enrollForm.phone)<1000000000 || parseInt(enrollForm.phone)>9999999999){
            alert("phone no. should be 10 digit number");
            return false;
        }
         else if(studentList.indexOf((item) =>  item.email=== enrollForm.email ) > 0 ){
            alert("email must be unique");
            return false;
        }
         const res = await axios.post("http://localhost:3000/students",enrollForm);
         alert("registed successfully");
         console.log(res);
         history.push('/');

         
   }
   const onChange = (e) =>{
        setEnrollForm({...enrollForm,[e.target.name]:e.target.value})
        console.log(enrollForm);
       
   }

   useEffect(() => {
    getStudent();
    //eslint-disable-next-line
},[])

const getStudent = async () => {
    let res = await axios.get("http://localhost:3000/students");
    setStudentList(res.data);
    console.log(studentList);
}

   
    return (
        <div className="app">
            <Header/>
            <div className="add-student-form p-5">
                
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Student Name" name="studentName" onChange={onChange} className="form-control" required className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Father's Name" name="fatherName" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="DOB" name="dob" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Address" name="address" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="City" name="city" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="State" name="state" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Pinode" name="pinCode" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Phone text" name="phone" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" name="email" onChange={onChange} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <select name="class" onChange={onChange} className="form-control">
                            <option value="" defaultValue disabled>Select Class</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Marks" name="marks" onChange={onChange} className="form-control" required/> 
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                        <input type="submit" className="btn btn-success" value="Submit" /> 
                        <div className="d-flex align-items-center justify-content-end">
                            <Link className="btn btn-primary" to="/">Back to home</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
