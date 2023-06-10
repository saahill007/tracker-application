
import { useEffect, useState } from 'react';
import './App.css'
import Table from './Components/Table'
import { application } from './Components/Table'
import AppForm from './Components/AppForm';
import SmallTile from './Components/SmallTile';
import { BiReset } from 'react-icons/Bi';

export const status = ['Applied','Rejected','Interview Given', 'Interview Scheduled','Offered'];
export type StatusKeys = 'Applied' | 'Offered' | 'InterviewGiven' | 'InterviewScheduled' | 'Rejected';
export const mapStatusToKey = (status: string): StatusKeys | undefined => {
    switch (status) {
      case 'Applied': 
        return 'Applied';
      case 'Offered':
        return 'Offered';
      case 'Interview Given':
        return 'InterviewGiven';
      case 'Interview Scheduled':
        return 'InterviewScheduled';
      case 'Rejected':
        return 'Rejected';
     
    }
  };
  function arrayToCSV(data:application[]) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
}
  type StatusCount = {
    Applied: number;
    Offered: number;
    InterviewGiven: number;
    InterviewScheduled: number;
    Rejected: number;
  };

  function downloadCSV(data:application[]) {
   
    const csvData = arrayToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Data.csv'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
function App() {
  useEffect(()=>{
    document.title="Application Tracker";
  },[])
  
  // let [statusCount,updateStatusCount] = useState({
  //   Applied: 2,
  //   Offered: 1,
  //   InterviewGiven: 1,
  //   InterviewScheduled: 1,
  //   Rejected: 0,
  // });

  let [statusCount, updateStatusCount] = useState<StatusCount>(() => {
    const localData = localStorage.getItem('statusCount');
    return localData ? JSON.parse(localData) : {
      Applied: 2,
      Offered: 1,
      InterviewGiven: 1,
      InterviewScheduled: 1,
      Rejected: 0,
    };
});
  let [showOption,updateShowOption]=useState(0);
  let [isSortedClicked, updateSortedClicked] = useState(false);
  
  // let [applications,updateApplications]=useState<application[]>([
  //   {applicationNo: 1, company: "ISS", dateApplied:"01/01/2000", link:"Junior Analyst", status:"Applied"},
  //   {applicationNo: 2, company: "Barclays", dateApplied:"02/01/2000", link:"Software Developer", status:"Offered"},
  //   {applicationNo: 3, company: "JPMC", dateApplied:"03/01/2010", link:"Product Manager", status:"Interview Given"},
  //   {applicationNo: 4, company: "Morgan Stanley", dateApplied:"01/01/2000", link:"Lead Data Analyst", status:"Applied"},
  //   {applicationNo: 5, company: "PWC", dateApplied:"09/01/2020", link:"Senior Software Developer", status:"Interview Scheduled"},
  // ]);
  let [applications, updateApplications] = useState<application[]>(() => {
    const localData = localStorage.getItem('applications');
    return localData ? JSON.parse(localData) : [
      {applicationNo: 1, company: "ISS", dateApplied:"01/01/2000", link:"Junior Analyst", status:"Applied"},
      {applicationNo: 2, company: "Barclays", dateApplied:"02/01/2000", link:"Software Developer", status:"Offered"},
      {applicationNo: 3, company: "JPMC", dateApplied:"03/01/2010", link:"Product Manager", status:"Interview Given"},
      {applicationNo: 4, company: "Morgan Stanley", dateApplied:"01/01/2000", link:"Lead Data Analyst", status:"Applied"},
      {applicationNo: 5, company: "PWC", dateApplied:"09/01/2020", link:"Senior Software Developer", status:"Interview Scheduled"},
    ];
});
  let [sortedContent,updateSortedContent]=useState<application[]>([...applications]);
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications,sortedContent]);
  
  useEffect(() => {
    localStorage.setItem('statusCount', JSON.stringify(statusCount));
  }, [statusCount,applications,sortedContent]);

  const handleDelete =(id: number)=>{
    // applications.filter(app=>app.applicationNo!=id);
    updateApplications(applications.filter(app=>app.applicationNo!==id));
    // updateSortedContent( applications.filter(a=>a.status===new_heading));
    // const currentStatus=mapStatusToKey(app.status);
    const deletedApp = applications.filter(app=>app.applicationNo===id);
    console.log(deletedApp[0].status);
    const curStatus = mapStatusToKey(deletedApp[0].status);
    if(curStatus){
      updateStatusCount((prevStatusCount)=>({
        ...prevStatusCount,
        [curStatus]: prevStatusCount[curStatus]-1,
      }));
    }
    updateSortedClicked(false);
  }
  const addApplication = (app: application)=>{
    updateApplications([...applications,app]);
    // const currentStatus:StatusKeys = app.status==="Interview Given"?"InterviewGiven":(app.status==="Interview Scheduled"?"InterviewScheduled":app.status);
    const currentStatus=mapStatusToKey(app.status);
    if(currentStatus){
      updateStatusCount((prevStatusCount)=>({
        ...prevStatusCount,
        [currentStatus]: prevStatusCount[currentStatus]+1,
      }));
    }
    updateSortedClicked(false);
  }
  const handleEdit = (id: number)=>{
    updateShowOption(id);
    
  }
  

  let onButtonClick = (heading: string)=>{
    
    const new_heading = heading==="Interview's Given"?"Interview Given":(heading==="Interview's Scheduled"?"Interview Scheduled":heading);
    console.log(new_heading);
    updateSortedContent( applications.filter(a=>a.status===new_heading));
    console.log(sortedContent);
    updateSortedClicked(true);

  }
  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    fontSize: '2em',
    padding: '20px',
    letterSpacing: '2px',
    textTransform: "uppercase" as "uppercase",
  };
  

  let reset = ()=>{
    updateSortedClicked(false);
  }
  return (
    <>
    <div style={headerStyle}>
        <h1>Job Application Tracker</h1>
      </div>
    <AppForm handleApplication={addApplication}></AppForm>
    {/* <button className="btn btn-primary" onClick={()=>downloadCSV(applications)}>Download CSV</button> */}
    <div className="tiles">
      <SmallTile heading='Applied' num={statusCount.Applied} onButtonClick={onButtonClick}/>
      <SmallTile heading="Interview's Scheduled" num={statusCount.InterviewScheduled}onButtonClick={onButtonClick}/>
      <SmallTile heading="Interview's Given" num={statusCount.InterviewGiven}onButtonClick={onButtonClick}/>
      <SmallTile heading='Rejected' num={statusCount.Rejected}onButtonClick={onButtonClick}/>
      <SmallTile heading='Offered' num={statusCount.Offered}onButtonClick={onButtonClick}/>
      <button className="tile" onClick={reset}>
        <h2 ><BiReset  style={{height:45, width:45}}/></h2>
    </button>
    </div>
    
    <Table onButtonClick={onButtonClick} download={()=>downloadCSV(applications)} handleSubmit={(app:application,newStatus:string)=>{
      updateShowOption(0);
      updateApplications(applications.map(a=>a.applicationNo===app.applicationNo?{...a,status:app.status}:a));
      const updatedApp = applications.filter(a=>a.applicationNo===app.applicationNo);
      console.log(updatedApp[0].status);
      const curStatus = mapStatusToKey(updatedApp[0].status);
      const newStatuss = mapStatusToKey(newStatus);
      console.log(curStatus);
      console.log(newStatuss);
      if(curStatus && newStatuss){
        updateStatusCount((prevStatusCount)=>({
          ...prevStatusCount,
          [curStatus]: prevStatusCount[curStatus]-1,
          [newStatuss]: prevStatusCount[newStatuss]+1,
        }));
      }
      updateSortedClicked(false);
      // updateApplications([...applications,app]);
    }} showOption={showOption} handleEdit={handleEdit} applications={
      isSortedClicked===true?sortedContent:applications
    } handleDelete={handleDelete}></Table></>
  )
}

export default App
