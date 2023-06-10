import  { FormEvent, useEffect, useRef, useState } from 'react'
import { application } from './Table';
import { status } from '../App';
// import { counter, updateCounter } from '../App';

interface Props{
    handleApplication: (app: application)=>void;
}
function getCurrentDate(): string {
    const date = new Date();
  
    const day = ("0" + date.getDate()).slice(-2); 
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const year = date.getFullYear();
  
    return month + "/" + day + "/" + year;
  }


function AppForm({handleApplication}:Props) {

let companyRef = useRef<HTMLInputElement>(null);
let linkRef = useRef<HTMLInputElement>(null);
let statusRef = useRef<HTMLSelectElement>(null);
// let [counter,updateCounter] = useState(6);
let [counter,updateCounter] = useState<number>(() => {
    const savedCounter = localStorage.getItem('counter');
    return savedCounter !== null ? parseInt(savedCounter) : 6;
  });
  useEffect(() => {
    localStorage.setItem('counter', counter.toString());
  }, [counter]);
const handleForm =(event:FormEvent)=>{
    event.preventDefault();
    
    let app: application = {
        applicationNo: counter,
        company: "",
        dateApplied: getCurrentDate(),
        link: "",
        status:""
    };
    updateCounter(counter+1);
    if(companyRef.current!=null){
        app.company = companyRef.current.value;
    }
    if(linkRef.current!=null){
        app.link = linkRef.current.value;
    }
    if(statusRef.current!=null){
        app.status = statusRef.current.value;
    }
    
      
      
      
    handleApplication(app);
    if (companyRef.current) companyRef.current.value = "";
    if (linkRef.current) linkRef.current.value = "";
    if (statusRef.current) statusRef.current.value = "No Response"; 
}


  return (
    <>
    <form className="appForm" onSubmit={handleForm}>
  <div className="form-group">

    <label>Company Name</label>
    <input required ref={companyRef}type="text" className="form-control" id="companyName" placeholder="Google.."></input>
    </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Position</label>
    <input required ref={linkRef} type="text" className="form-control" id="link" placeholder="Analyst.."></input>
  </div>
  <div className="form-group">
    <label htmlFor="status">Status</label>
    <select required ref={statusRef} className="form-control" id="status">
      {/* <option selected>Applied</option> */}
      {status.map(st=><option>{st}</option>)}
      
    </select>
  </div>
 
  <button type="submit" className="btn btn-primary fg" style={{ display: 'block', background:'#33665e', marginLeft: 'auto', marginRight: 'auto', border: 'None' }}>SUBMIT</button>
</form>
    </>
  )
}

export default AppForm