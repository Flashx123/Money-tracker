//import { Button } from "@/components/ui/button"
import { AuroraText } from "@/components/magicui/aurora-text";
import { Ripple } from "@/components/magicui/ripple";
import { FormEvent, useState } from "react";

import './App.css'


function App() {
  
  const [name,setName] = useState('');
  const [datetime,setdateTime] = useState('');
  const [desc,setdescription] = useState('');

  const addNewTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = import.meta.env.REACT_APP_APIURL + '/transaction';
    console.log(url);
    fetch(url,{
      method:'POST',
      headers: {
           'Content-Type': 'application/json',
},
    body: JSON.stringify({ name, desc, datetime })
    }).then(Response =>{
      Response.json().then(json =>{
        console.log('result',json);
      });
    });
    // console.log(url);
  };

  return (
    <>

<div className="relative min-h-screen w-full">
      {/* The Ripple component as the background */}
      <Ripple />

    
     <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-center mt-6">
      Money <AuroraText>Tracker</AuroraText>
    </h1>
      <main>
    <h1>$500 <span>.00</span></h1>
    <form action="formMoney" onSubmit={addNewTransaction}> 
      {/* onSubmit={Addtransaction()}> */}

    <div className="inputs">
      <input type="text" value={name}  onChange={ev => setName(ev.target.value)} placeholder='Give the transaction title' />
      <input type="datetime-local" value={datetime} onChange={ev=> setdateTime(ev.target.value)} />

    </div>

    <div className="description">
      <input type="text" value={desc} onChange={ev=>setdescription(ev.target.value)} placeholder='Give the description you like'/>
    </div>
    <button type='submit'>Add transaction</button>
    </form>
    
    <div className="transactions">
      <div className="transaction">
        <div className="left">
          <div className="name">New MI TV</div>
          <div className="description ">this is a new TV for Home</div>
        </div>

        <div className="right">
          <div className="price-red font-bold text-red-600">-$600.0</div>
          <div className="datetime text-cyan-200">2022-1-12</div>
        </div>
      </div>

      <div className="transaction">
        <div className="left">
          <div className="name text-amber-50">Samsung</div>
          <div className="description text-amber-50">THe phone</div>
        </div>

        <div className="right">
          <div className="price">$300.0</div>
          <div className="datetime text-amber-50">2013-10-12</div>
        </div>
      </div>


      <div className="transaction">
        <div className="left">
          <div className="name">Samsung</div>
          <div className="description">THe phone</div>
        </div>

        <div className="right">
          <div className="price">$300.0</div>
          <div className="datetime">2013-10-12</div>
        </div>
      </div>

    </div>

    
    </main>
    </div>
    {/* <div className="flex flex-col items-center justify-center ">
      <Button>Click me</Button>
    </div> */}
    </>
  )
}

export default App
