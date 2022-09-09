import React from "react";
import {useState,useEffect} from "react";
import axios from "axios";



function HomePage() {
  const[all,setAll]=useState([]);
  const [searchInput, setSearchInput] = useState("");
  const searchItems = () => {

  }
  useEffect(()=>
  {
    async function getAll()
    {
      await axios.get("http://127.0.0.1:8000/api/v1.0/market/company/getall/").then((res)=>{
        setAll(res.data);
      })

    }
    getAll();
  },[]);


  return (
    <div >
      <h1>Connect ReactJS to Django</h1>
      <button>Add Company</button> <button>List all companies</button> <input icon="search" name="search" placeholder="<CompanyCode>"
        onChange={(e)=>searchItems(e.target.value)}
      /><button onClick>Search</button>
      <br/><br/>
      <table className="t">
        <tbody>
          <tr>
            <th>StockPrice</th>
            <th>Price</th>
            <th>Time</th>
          </tr>
          {all.map((a,i)=>
          {
            return(
              <tr key={i}>
                <td>{a.companyname}</td>
                <td>{a.prices[0].price_stock}</td>
                <td>{a.prices[0].created}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  );
}

export default HomePage