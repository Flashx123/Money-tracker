//import { Button } from "@/components/ui/button"
import { AuroraText } from "@/components/magicui/aurora-text";
import { Ripple } from "@/components/magicui/ripple";
import { FormEvent, useEffect, useState } from "react";
//import { config } from "dotenv";

import './App.css'


function App() {

  interface Transaction {
    name: string;
    desc: string;
    price: number;
    datetime: string;
  }
  
  const [name,setName] = useState('');
  const [datetime,setdateTime] = useState('');
  const [desc,setdescription] = useState('');
  const [transactions,setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchTransactionsAndUpdateBalance();
  }, []);

 async function fetchTransactionsAndUpdateBalance() {
  const url = import.meta.env.REACT_APP_APIURL + '/getTransactions';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as Transaction[];
    setTransactions(data);
    calculateBalance(data); // Calculate balance after fetching
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

const calculateBalance = (transactions: Transaction[]) => {
  let newBalance = 0;
  for (const transaction of transactions) {
    const price = typeof transaction.price === 'string' ? parseFloat(transaction.price) : transaction.price;
    if (!isNaN(price)) {
      newBalance += price;
    }
  }
  setBalance(newBalance); // Update the balance state
};


 

  const addNewTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = import.meta.env.REACT_APP_APIURL + '/transaction';
    console.log(url);
    const price = name.split(' ')[0];
    fetch(url,{   // this is the method of taking infromation from the webpage
      method:'POST',
      headers: {
           'Content-Type': 'application/json',
},
    body: JSON.stringify({ 
      price,
      name : name.substring(price.length + 1), 
      desc, 
      datetime })
    }).then(Response =>{
      Response.json().then(json =>{
        setName('');
        setdateTime('');
        setdescription('');
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
    <h1>${balance}<span>.00</span></h1>
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
    
      {transactions.length > 0 && transactions.map((transaction)=>(
        <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description ">{transaction.desc}</div>
          </div>
  
          <div className="right">
            <div className="price-red font-bold text-red-600">{transaction.price}</div>
            <div className="datetime text-cyan-200">{transaction.datetime}</div>
          </div>
        </div>
      ))}

      


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
