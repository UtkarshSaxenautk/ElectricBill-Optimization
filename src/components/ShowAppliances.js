import React, {useEffect, useState} from "react";
import { Box, Button, Typography} from "@mui/material";
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';


const ShowAppliances = () => {

    const [id, setId] = useState(0);

    const[item, setItem] = useState("");
    console.log(item);
    const[brands, setBrands] = useState([]);
    const[brand, setBrand] = useState("");
    const[rows,setRows] = useState([]);
    const [expectedHour, setExpectedHours] = useState(0);
    const [bill, setBill] = useState(0);
    const [finalState, setFinalState] = useState({});
    const[errorMsg, setErrorMsg] = useState('');
    const [response, setResponse] = useState(null);
    const [brandData, setBrandData] = useState(null);
    console.log(response);
    const API = axios.create({ baseURL: 'http://localhost:3030/user/' });


    const handleSubmit = (e) =>{
        e.preventDefault();
   
        let app = [];
        for (let i = 0; i < rows.length; i++) {
            app.push({
                id: rows[i].id,
                name: rows[i].item,
                brand: rows[i].brand,
                power: rows[i].consumption,
                expectedhour: parseInt(rows[i].expectedHour)
            })
          }

        API.post('/createUser', {userId: '1',user:'utkarsh', total: id, appliances: app, bill: parseInt(bill) }).then((res) =>{
            console.log(res.data.branddata);
            setBrandData(res.data.branddata);
            setResponse(res.data.hours_appliance_should_decrease);
            setErrorMsg(res.data.msg);
        }).catch((e) =>{
            console.log(e); 
        })

         
    }

    const handelHoursChange = (e) => {
        setExpectedHours(e.target.value)
    }

    const handelItemChange = (e) => {
        setItem(e.target.value)
    }

    const handelBrandChange = (e) => {
        setBrand(e.target.value)
    }

    const handelBillChange = (e) =>{
        setBill(e.target.value);
    }

    const handleAddMore = () =>{

        const arr = [...rows];
        let consumption;
        brands?.map((type) => {
          if(type.title == brand){
            consumption = type.consumption;
          }
         
        });
        setId(id+1);
        arr.push({id: id, expectedHour: expectedHour, item: item, brand: brand, consumption: consumption});
        setRows(arr);
  
    }

    const handleDelete = (id) => {
        setRows(rows.filter((row) => row.id !== id));
        console.log(rows);  
    }

    useEffect(()=>{
    
        API.get('appliance/'+item).then((res) =>{
          setBrands(res.data[0]?.brands);
          console.log(res.data[0]?.brands);
        });

       

    },[item,expectedHour,brand, finalState, errorMsg, response]);
      


    return (
            <div className='text-center mt-10 w-9/12 m-auto font-mono'>
      <p className='text-4xl font-bold'>Please enter details of appliances </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className = 'flex  mt-5 mb-10'>
  

          <Box style={{ width: "80%", margin: "auto" }}>
          <InputLabel id="demo-simple-select-label">Select Appliance</InputLabel>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='item'
              value={item}
              onChange={handelItemChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : 'black'}}
            >
              <MenuItem value='bulb'>Bulb</MenuItem>
              <MenuItem value='tube'>Tube</MenuItem>
              <MenuItem value='fan'>Fan</MenuItem>
              <MenuItem value='ac'>Air Conditioner</MenuItem>
            </Select>
          </Box>
    
          <Box style={{ width: "80%", margin: "auto" }} >
          <InputLabel id="demo-simple-select-label">Select Appliance Type</InputLabel>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='brand'
              value={brand}
              onChange={handelBrandChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : 'black'}}
            >
              {
                brands?.map((type) =>{
                  return(
                      <MenuItem value={type.title} >{type.title}</MenuItem>
                    )
                })
              }
            </Select>
          </Box>
          <Box style={{ width: "80%", margin: "auto" }}>
          <InputLabel id="demo-simple-select-label">Expected Usage</InputLabel>
<Select
  className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
  name='expectedHour'
  value={expectedHour}
  onChange={handelHoursChange}
  displayEmpty
  inputProps={{ 'aria-label': 'Without label' }}
  style ={{height : '50px', borderRadius:'15px', color : 'black'}}
>
  <MenuItem value="" className = 'inputGeneralStyle'>
    <em>Expected Usage</em>
  </MenuItem>
  <MenuItem value='1'>1</MenuItem>
  <MenuItem value='2'>2</MenuItem>
  <MenuItem value='3'>3</MenuItem>
  <MenuItem value='4'>4</MenuItem>
  <MenuItem value='5'>5</MenuItem>
  <MenuItem value='6'>6</MenuItem>
  <MenuItem value='7'>7</MenuItem>
  <MenuItem value='8'>8</MenuItem>
  <MenuItem value='9'>9</MenuItem>
  <MenuItem value='10'>10</MenuItem>
  <MenuItem value='11'>11</MenuItem>
  <MenuItem value='12'>12</MenuItem>
  <MenuItem value='13'>13</MenuItem>
  <MenuItem value='14'>14</MenuItem>
  <MenuItem value='15'>15</MenuItem>
  <MenuItem value='16'>16</MenuItem>
  <MenuItem value='17'>17</MenuItem>
  <MenuItem value='18'>18</MenuItem>
  <MenuItem value='19'>19</MenuItem>
  <MenuItem value='20'>20</MenuItem>
  <MenuItem value='21'>21</MenuItem>
  <MenuItem value='22'>22</MenuItem>
  <MenuItem value='23'>23</MenuItem>
  <MenuItem value='24'>24</MenuItem>
</Select>
</Box>
<Box className="mb-3 mt-5 w-22 ml-5 " style={{marginTop: '30px'}}><Button onClick={handleAddMore} variant="contained" style={{background: 'teal'}}><p className="py-1" style={{width: '200px'}}>Add Appliance</p></Button></Box>
        </div>
        <Box className='justify-center w-9/12 m-auto'>
        {
            <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='text-center'>
              <TableHead>
                <TableRow >
                  <TableCell align="center" style={{fontSize: '18px', fontWeight: '600' }}>Item</TableCell>
                  <TableCell align="center" style={{fontSize: '18px', fontWeight: '600' }}>Brand</TableCell>
                  <TableCell align="center" style={{fontSize: '18px', fontWeight: '600' }}>Expected Hour Usage</TableCell>
                  <TableCell align="center" style={{fontSize: '18px', fontWeight: '600' }}>Consumption</TableCell>
                  <TableCell align="center" style={{fontSize: '18px', fontWeight: '600' }}>Edit</TableCell>
                </TableRow> 
              </TableHead>
              <TableBody>
              {rows?.map((row, id) =>{
                return(
                    <>
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.item.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">{row.brand.toUpperCase()}</TableCell>
                    <TableCell align="center">{row.expectedHour.toUpperCase()}</TableCell>
                    <TableCell align="center">{row.consumption}W</TableCell>
                    <TableCell align="center"><Button variant="contained" style={{background: 'teal'}} onClick={()=> handleDelete(row.id)}>remove</Button></TableCell>
                  </TableRow>
                    </>
                )
            })}
              </TableBody>
            </Table>
          </TableContainer>
        }
        </Box>
        <Box className="mt-20 mb-10">
            <p className="mb-3 font-bold"> (Please enter the monthly bill <span className="text-4xl font-italic">Limit</span> )</p>
            <label className="text-lg" >Expected Bill: </label>
            <input className="border-2 border-slate-700 rounded-md h-10 p-2 w-24" type="text" value={bill} onChange={handelBillChange}></input>
            
        </Box>
        
        <Box><Button type="submit" variant="contained" className="pb-10" style={{background: 'teal'}}>Submit</Button></Box>


      
      </form>
      <Box className="pt-10">
            {errorMsg === 'your bill will be optimized' && <Alert severity="success" className="justify-center w-9/12 m-auto mb-20">
                Your Bill will be optimized.
        </Alert>}
        {errorMsg === 'failed' && 
        <Alert severity="error" className="justify-center w-9/12 m-auto pt-10 mb-20" >
            Bill will exceed the Budget. Please try changing the Appliances.
        </Alert>
        }
        {response !== null ? <><p className="text-3xl font-bold">Our Recommendations</p>
        <p className="mb-10">(Make Changes in the above table to bring bill under specified Expected Bill Budget.)</p>
        <Box className="bg-lime-100 w-9/12 m-auto rounded-2xl mb-5">
          <p className="text-2xl underline mb-10 pt-5">By Changing Hour Usage</p>
        {
          response?.map((r,index) =>{
              return(
                  <div key={index}>
                    {response && <>
                    <div className="text-xl text-left ml-10 pb-5"><span className="font-bold">{index+1}.</span> {r.brand} {r.name.toUpperCase()} is over limit by {Math.round(r.extraminutes/60)} Hours</div>
                    </>}
                  </div>
              )
          })
        }
        </Box>
      <Box className="bg-green-600 w-9/12 m-auto rounded-2xl text-white mb-20">
        <p className="text-2xl underline mt-10 pt-5 mb-10">By Using Alternative Brands</p>
        {
           brandData?.map((r,index) =>{
              return(
                  <div key={index}>
                    {response && <div className="text-xl text-left ml-10 pb-5"><span className="font-bold">{index+1}.</span> {r.brand} {r.name.toUpperCase()}</div>}
                  </div>
              )
          })
        }
        </Box></> : null}
      </Box>
    </div>
    );
};

export default ShowAppliances;