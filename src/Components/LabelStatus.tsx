
interface Props{
    label:string;
    onButtonClick: (header: string)=>void;
}

function LabelStatus({label,onButtonClick}:Props) {
    let badgeType = "warning";
    if(label==="Interview Scheduled"){
        badgeType = "dark";
    }else if(label==="Interview Given"){
        badgeType = "secondary";
    }else if(label==="Offered"){
        badgeType = "success";
    }
    else if(label==="Rejected"){
        badgeType = "danger";
    }console.log(badgeType);
    const finalClass = "btn btn-"+badgeType +" btnlabel";
    // console.log(finalClass);
  return (
    // <span className={finalClass}>label</span>
    <button className={finalClass} onClick={()=>onButtonClick(label)}>{label}</button>
  )
  
}

export default LabelStatus