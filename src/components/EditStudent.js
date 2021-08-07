import React , {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

export default function EditStudent(props) {
    const history = useHistory();
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
        marks : ""
    });

    


    useEffect(() => {
       
        fetch(`http://localhost:3000/students/${props.match.params.id}`).then((res) => {
            res.json().then((result)=>{
                console.log(result)
                setEnrollForm({
                    studentName : result.studentName,
                    fatherName : result.fatherName,
                    dob : result.dob,
                    address : result.address,
                    city : result.city,
                    state : result.state,
                    pinCode :result.pinCode,
                    phone : result.phone,
                    email : result.email,
                    class : result.class,
                    marks : result.marks
                })
                console.log(result)

            })
        })
//eslint-disable-next-line      
    }, [])

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
         const res = await axios.put(`http://localhost:3000/students/${props.match.params.id}`,enrollForm);
         console.log(res);
         history.push('/');
         
   }
   const onChange = (e) =>{
        setEnrollForm({...enrollForm,[e.target.name]:e.target.value})
        console.log(enrollForm);
       
   }

    return (
        <div className="app">
            <Header/>
            <div className="add-student-form p-5">
                <div className="d-flex align-items-center justify-content-end">
                    <Link className="btn btn-primary" to="/">Back to home</Link>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="fieldset">
                        <input type="text" placeholder="Student Name" name="studentName" onChange={onChange} value={enrollForm.studentName} required/>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="Father's Name" name="fatherName" onChange={onChange} value={enrollForm.fatherName} required/>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="DOB" name="dob" onChange={onChange} value={enrollForm.dob} required/>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="Address" name="address" onChange={onChange} value={enrollForm.address} required/>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="City" name="city" onChange={onChange} value={enrollForm.city} required/>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="State" name="state" onChange={onChange} value={enrollForm.state} required/>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="Pincode" name="pincode" onChange={onChange} value={enrollForm.pincode} required/>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="Phone" name="phone" onChange={onChange} value={enrollForm.phone} required/>
                    </div>
                    <div className="fieldset">
                        <input type="email" placeholder="Email" name="email" onChange={onChange} value={enrollForm.email} required/>
                    </div>
                    <div className="fieldset">
                        <select name="class"  onChange={onChange} value={enrollForm.class} >
                            <option value="Select Class" defaultValue disabled>Select Class</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="fieldset">
                        <input type="text" placeholder="Marks" name="marks" value={enrollForm.marks}  onChange={onChange} required/> 
                    </div>
                    <div className="fieldset">
                        <input type="submit" value="Submit" /> 
                    </div>
                </form>
            </div>
        </div>
    )
}
