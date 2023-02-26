import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deposit } from "../actions/deposit";
import { depositTransactionHistory } from "../actions/deposit";
import { loan } from "../actions/loan";
import { RemoveFirstLoad } from "../actions/auth";

import Loading from "../components/loading.js";


function DashBoard() {
  const { isFirstLoad } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { depositList } = useSelector((state) => state.deposit);
  const { transactionHistoryList } = useSelector((state) => state.deposit);
  const { loanList } = useSelector((state) => state.loan);
  const [loading, setLoading] = useState(false);
  const UserID = user.data.UserID
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log("Hello World")
    if(isFirstLoad){
      setLoading(true)
      console.log(UserID)
      const p1 = dispatch(loan(UserID))
      const p2 = dispatch(deposit(UserID))
      const p3 = dispatch(depositTransactionHistory(UserID))
      Promise.all([p1,p2,p3]).then(()=>{
        console.log(transactionHistoryList)
        dispatch(RemoveFirstLoad())
        setLoading(false)
    })
    } else{
      console.log("not first load")
    }
    },[]);

  
  
  return (
    <>
    </>
  )
  
}

export default DashBoard;
