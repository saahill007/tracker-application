import { MdDeleteOutline } from 'react-icons/Md';
import { BiEdit } from 'react-icons/Bi';
import {  useRef } from 'react';
import { status } from '../App';
import { BsDownload } from 'react-icons/Bs';
import LabelStatus from './LabelStatus';

export interface application{
    applicationNo: number;
    company: string;
    dateApplied: string;
    link: string;
    status: string;
    
}

interface Props{
    applications: application[];
    handleDelete: (id: number)=>void;
    handleEdit: (id:number)=>void;
    showOption: number;
    handleSubmit: (app:application,earlierStatus: string)=>void;
    download: ()=>void;
    onButtonClick:(header: string)=>void;
}

function Table({applications,handleDelete, handleEdit, showOption,handleSubmit,download,onButtonClick}: Props) {
    let optionRef = useRef<HTMLSelectElement>(null);
    
  return (
    <div className="tableCSS">
    <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">App No.</th>
      <th scope="col">Company</th>
      <th scope="col">Date Applied</th>
      <th scope="col">Position</th>
      <th scope="col">Delete</th>
      <th scope="col">Edit Status </th>
      <th scope="col">Status  <a  className="btn btnsecondary download-btn" onClick={download}><BsDownload/> </a></th>
    </tr>
  </thead>
  <tbody>
    {applications.map((application)=>(
        
        <tr>
        <th scope="row">{application.applicationNo}</th>
        <td>{application.company}</td>
        <td>{application.dateApplied}</td>
        <td>{application.link}</td>
        <td><button style={{backgroundColor:'#8B0000'}}className="btn btn-danger" onClick={()=>handleDelete(application.applicationNo)}><MdDeleteOutline/>  Delete </button></td>
        <td><button style={{backgroundColor:'#2F4F4F', border:'None'}}className="btn btn-primary" onClick={()=>handleEdit(application.applicationNo)}><BiEdit/>Edit</button></td>
        <td>{ showOption===application.applicationNo?
        <>
            <select ref={optionRef} className="form-control" id="status" onChange={
                (event)=>{
                    event.preventDefault();
                    
                    let app: application = {
                        ...application,
                        
                    };
                    let newStatus = "";
                    if(optionRef.current!=null){
                        app.status = optionRef.current.value;
                        newStatus = optionRef.current.value;
                    }
                    // console.log(app);
                    handleSubmit(app,newStatus);

            }}>
                <option value=""disabled selected>Select Status</option>
                {status.map(s=><option>{s}</option>)}
                
            </select>
        </> :<LabelStatus onButtonClick={()=>onButtonClick(application.status)} key={application.applicationNo}label={application.status}></LabelStatus> }</td>
      </tr>
    )
    )}
   
  </tbody>
</table>


    </div>
  )
}

export default Table