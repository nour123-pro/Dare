import { useState } from 'react';
import '../assets/newspaper.css'
import Popup from './Popup';
export default function NewsPaper(){
    const[subscribedemail,setemail]=useState<string>();
    const[show,setshow]=useState<boolean>(false);
    const HandleSubmit=()=>{
        if(subscribedemail==null)
        {
            alert('enter emi')
        }else{
           setshow(true);
        }
    };
    
    return(
       <div className="NewsPaperDiv">
        <span className='NewsPaperText'>
        Lets Start Controling

        Your Skin
        <br />
        <span className='highlight'>
        Today <span className="sparkle"></span>
        </span>
      
       
        
        </span>
        <div className='newspaperdivmain'>
            <div className='textmain'>
          
            <i className="fi fi-tr-at"></i>
            mail
            </div>
            <form action="" style={{display:'flex'}}>
            <input 
                type="email" 
                placeholder="lovemyskin.com" 
                onChange={(event) => setemail(event.target.value)} 
                required 
                value={subscribedemail || ''} 
            />
            <div className='submitbutton'>
                <i 
                    className="fi fi-ss-check"
                    onClick={HandleSubmit} 
                    role="button" 
                    aria-label="Submit"
                ></i>
            </div>
            </form>
           
        </div>

       <Popup show={show} onClose={()=>setshow(false)}></Popup>
       </div>
    );
}