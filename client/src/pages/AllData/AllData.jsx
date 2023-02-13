import React from "react";
import "./AllData.css";
import { useState ,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {RiDeleteBinLine} from 'react-icons/ri'
import {FaBullseye, FaUserEdit} from 'react-icons/fa'

const AllData = () => {
  // home page data
  const [data, setData] = useState([]);
  let [current,setCurrent] = useState(null);
  const loadData=async()=>{
    const response=await axios.get("http://localhost:3000/api/get");
    setData(response.data);
      };

  useEffect(()=>{
    loadData(); 
  },[]);
  
 
  const navigate = useNavigate();
  let optionAction = (currentData) => {
    setOpen(true); 
    setCurrent(currentData)
  }
  
  const [open,setOpen]=useState(false);
  const[SearchTerm,setSearchTerm]=useState('');

  const deleteContact=(id)=>{
    if(id){
      axios.delete(`http://localhost:3000/api/remove/${id}`);
      setTimeout(( )=>loadData(id),600)
      navigate("/")
      setOpen(false)
  }
}

  // 
  return (
    <div className="container">
{open && (
        <div className="modalBody">
         <div className="modalContent">
                  <RiDeleteBinLine className="deleteIcon"/>
            <p className="deleteText">Are you sure you want to delete</p>
          <div className="btn-group">
             
                 <button className="cancel btn-modal" onClick={() => setOpen(false)}>Cancel</button>
                      <button className="delete btn-modal"  onClick={() => deleteContact(current)}>Yes</button>
                    
               
             </div>
           </div>
      </div>
       )}   
     
      <p className="Title">Student management system</p>

      
      
      <div className="headerContainer">
         <div>
          <form className="d-flex" role="search">
            <input 
              className="form-control searchField"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e)=>{
                setSearchTerm(e.target.value);
              }}
                     
            />
            
          </form>
        </div> 
        
        <Link to={`http://localhost:3001/studentEditForm/`}>
        <button className="btn addMore" type="button">
          Add
          
        </button>
        </Link>
      </div>

      <div className="table-responsive tablecontainer">
        <table className="table content">
          <thead className="thead">
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location </th>
              <th>Email</th>
              <th>DOB</th>
              <th>Education</th>
               <th>Action</th> 
              <th>Delete</th>
              
            </tr>
          </thead>
          <tbody className="tbody" >
             {data.filter((item)=>{
              if(setSearchTerm===""){
                return item
              }else if(item.fname.toLowerCase().includes(SearchTerm.toLowerCase()) || item.lname.toLowerCase().includes(SearchTerm.toLowerCase())){
              return item
              }
              
              }).map((item, index)=>{
              return(
                <tr key={item.id}>
                  <th scope="row">{index+1}</th>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.location}</td>
                  <td>{item.email}</td>
                  <td>{item.dob}</td>
                  <td>{item.education}</td>
                  
                  <td>
                    <Link to={`/update/${item.id}`}>
                    <button className="edit-btn" onClick={() =>setOpen(true)}><FaUserEdit className="d-ic"/>Edit</button>
                    </Link>  
                  </td>
                    
                  <td ><button key={item.id} type="button" className="delete-btn" onClick={() => optionAction(item.id)}><RiDeleteBinLine  className="d-ic"/>Delete</button>
              </td>
                </tr>
              )
             })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default AllData;
