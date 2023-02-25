import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deposit } from "../actions/deposit";
import { loan } from "../actions/loan";

import Loading from "../components/loading.js"

function DashBoard() {
  const { user } = useSelector((state) => state.auth);
  const { depositList } = useSelector((state) => state.deposit);
  const { loanList } = useSelector((state) => state.loan);
  const [loading, setLoading] = useState(false);
  const UserID = user.data.UserID
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    setLoading(true)
    const p1 = dispatch(loan(UserID))
    const p2 = dispatch(deposit(UserID))
    Promise.all([p1,p2]).then(()=>{
      console.log(depositList)
      console.log(loanList)
    })


    /*dispatch(loan(UserID)).then(()=>{
      console.log(loanList)
    })
    dispatch(deposit(UserID)).then(()=>{
      console.log(depositList)
    })
    setLoading(false)
    console.log(loading)
    const p1 = dispatch(deposit(UserID))
    const p2 = dispatch(loan(UserID))
    Promise.all([p1,p2]).then(()=>{
      console.log(depositList)
    })*/

    },[]);

  
  
  return (<>
    {loading && <Loading></Loading>}
  </>
  )
  
}

export default DashBoard;
