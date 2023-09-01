import "./App.css"
import { useEffect, useState } from 'react';
const Form =()=>{
    const select_option=['Xero','MYOB'];
    const [checkbox_value,setcheckbox_value]=useState(false);
    const [classname,setclassname]=useState('form_input');
    const [formdata,setformdata]=useState([{
        company_name:"",
        business_type:"",
        year_established:"",
        industry:"",
        contact_name:"",
        email_address:"",
        phone_number:"",
        loan_amount:"",
        purpose_of_Loan:"",
        account_provider:"",
    }]);
    

    const enter_value=(e)=>{
        const {id,value} =e.target;
        setformdata(form=>form.map((list,index)=>(index===0?{...list,[id]:value}:list)));
    }

    const[balancesheet,setbalancesheet]=useState([]);
    const [input_disable,setinput_disable]=useState(true);

    useEffect(()=>{
        if(checkbox_value==true && formdata[0].account_provider){
        fetch(`https://effective-memory-rj96j9jx6vwhqwx-8080.app.github.dev/${formdata[0].account_provider}`)
        .then(response=>response.json())
        .then(data=>setbalancesheet(data))
        .catch(error=>console.error(error))
        }
        else{
            setbalancesheet([]);
        }
        
    },[checkbox_value,formdata[0].account_provider])

    const changeBalanceSheet=(e)=>{
        const {name,id,value}=e.target;
        console.log(name,id,value);
        setbalancesheet(bs=>bs.map((list,index)=>(index===id?({...list,[name]:value}):(list))))
    }

    const submitForm=(e)=>{
        e.preventDefault();
        const senddata={formdata:formdata,balancesheet:balancesheet};
        const response=fetch('https://effective-memory-rj96j9jx6vwhqwx-8080.app.github.dev/decision_maker',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senddata),
        })
        
        .then(response=>{
            if(response.ok){
                document.getElementById('form').reset();
               window.location.href="/sucess";
            }
            else{
                document.getElementById('form').reset();
                window.location.href="/error";
            }
        })
        .catch(error=>console.log(error));
    }
        const mobilernumber=(e)=>{
            var numbers = /^[0-9]+$/;
            if(e.target.value.match(numbers)|| e.target.value.length===0){
                if(e.target.value.length<=10){
                enter_value(e);
                }
            }
        }

        const year=(e)=>{
            var numbers = /^[0-9]+$/;
            if(e.target.value.match(numbers)|| e.target.value.length===0){
                if(e.target.value.length<=4){
                enter_value(e);
                }
            }
        }

        const loanamount=(e)=>{
            var numbers = /^[0-9]+$/;
            if(e.target.value.match(numbers)|| e.target.value.length===0){
                enter_value(e);
            }
        }

return(
<div className='form_body'>
    <form method="Post" id="form" onSubmit={(e)=>submitForm(e)} >
        <h2 style={{textAlign:"center",paddingTop:"30px"}}>Loan Application Form</h2>
        <div style={{marginLeft:"5%",marginTop:"5%",width:"90%"}}>
        <h4>Business Information</h4>
        <div className="form_label">
        <div><label>Business Name<span className='red_star'>*</span></label></div><div><input className={classname} type="text" name="company_name" id="company_name" placeholder='Enter comapany name' value={formdata[0].company_name} onChange={(e)=>{enter_value(e)}} required autoFocus/></div>
        </div>
       <div className="form_label">
        <div><label>Business Type<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="business_type" id="business_type" placeholder='Enter business type' value={formdata[0].business_type} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>
       <div className="form_label">
        <div><label >Year Established<span className='red_star'>*</span></label></div><div><input className='form_input'  type="year" name="year_established" id="year_established" placeholder='Enter year established' value={formdata[0].year_established} onChange={(e)=>{year(e)}} required/></div>
        </div>
       <div className="form_label">
        <div><label >Industry<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="industry" id="industry" placeholder='Enter industry' value={formdata[0].industry} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>

        <h4>Contact Details</h4>

       <div className="form_label">
        <div><label >Contact Name<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="contact_name" id="contact_name" placeholder='Enter contact name' value={formdata[0].contact_number} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>

       <div className="form_label">
        <div><label >Email Address<span className='red_star'>*</span></label></div><div><input className='form_input' type="email" name="email_address" id="email_address" placeholder='Enter email address' value={formdata[0].email_address} onChange={(e)=>{enter_value(e)}} required/></div>
        </div>

       <div className="form_label">
        <div><label >Phone Number<span className='red_star'>*</span></label></div><div><input className='form_input' type="text" name="phone_number" id="phone_number" placeholder='Enter phone number' value={formdata[0].phone_number} onChange={(e)=>{mobilernumber(e)}} required/></div>
        </div>
       
        <h4>Financial Information</h4>
        <div className='form_label'>
        <div><label>Loan Amount Required<span className='red_star'>*</span></label></div>
        <div><input className='form_input' type='text' id="loan_amount" pattern="[0-9]*" name='loan_Amount' placeholder='Enter Loan amount' value={formdata[0].loan_amount} onChange={(e)=>{loanamount(e)}} required /></div>
        </div>
        <div className='form_label'>
        <div><label>Purpose of Loan<span className='red_star'>*</span></label></div>
        <div><input className='form_input' type='text'  name='purpose_of_Loan' id="purpose_of_Loan" placeholder='Enter purpose of loan' value={formdata[0].purpose_of_Loan} onChange={(e)=>{enter_value(e)}} required /></div>
        </div>
        
       <div className="form_label">
        <div><label>Accounting Provider<span className='red_star'>*</span></label></div>
        <div><select className="form_select" id="account_provider"  name="account_provider" onChange={(e)=>{enter_value(e)}} required >
            <option value="" disabled selected>Select</option>
              {
                select_option.map((list,index)=>{
                    return(
                        <>
                        <option key={index}  value={list}>{list}</option>
                        </>
                    );
                })
              }  
        </select>
        </div>
        </div>
        </div>
        <div className='form_label'>
        <div><input className="form_checkbox" type='checkbox' checked={checkbox_value} onChange={()=>checkbox_value===true?(setcheckbox_value(false)):setcheckbox_value(true)} required></input> <span><span className='red_star'>*</span>Click hear to fetch balance sheet</span></div></div>
        {
            balancesheet.length>0?(
        <div className='balance_sheet_table'>
        <div style={{marginBottom:"10px",width:"100%",height:"20px"}}>
        <button onClick={(e)=>{e.preventDefault();setinput_disable(false)}} className='table_button red'>Edit</button>
        <button onClick={(e)=>{e.preventDefault();setinput_disable(true)}} className='table_button grey'>Lock</button>
        </div>
        <table>
            <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Profit or Loss</th>
            <th>Assets Value</th>
            </tr>
            {
                balancesheet.map((list,index)=>{
                    return(
                        <tr key={index}>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={balancesheet[index].year} name={"year"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)}/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.month} name={"month"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)}/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.profitOrLoss} name={"profitOrLoss"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)}/></td>
                            <td className='balance_sheet_data'><input className='balance_sheet_input' value={list.assetsValue} name={"assetsValue"} id={index} disabled={input_disable} onChange={(e)=>changeBalanceSheet(e)}/></td>
                        </tr>
                    );
                })
            }
        </table>
        </div>
            ):null
        }
        <button className='submit_button' type="submit">Submit</button>
    </form>
    </div>
);
}
export default Form;