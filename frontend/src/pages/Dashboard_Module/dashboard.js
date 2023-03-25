import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deposit, depositTransactionHistory } from "../../actions/deposit";
import { loan } from "../../actions/loan";
import { creditcard } from "../../actions/creditcard";
import { peekDetail } from "../../actions/peekdetail";
import { RemoveFirstLoad } from "../../actions/auth";

import Loading from "../../components/loading.js";

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import MainBottomNavigation from "../../components/MainBottomNavigation";


function DashBoard() {
  const { isFirstLoad } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  // const { depositList } = useSelector((state) => state.deposit);
  // const { transactionHistoryList } = useSelector((state) => state.deposit);
  // const { loanList } = useSelector((state) => state.loan);
  // const { loan_transactionHistoryList } = useSelector((state) => state.loan);
  ///const { creditCardList } = useSelector((state) => state.creditcard);
  // const { peek_detail_item } = useSelector((state) => state.peekDetail);
  
  const [loading, setLoading] = useState(false);
  const UserID = user.data.UserID
  
  const dispatch = useDispatch()
  
  /*useEffect(() => {
    if(isFirstLoad){
      setLoading(true)
      const p1 = dispatch(loan(UserID))
      const p2 = dispatch(deposit(UserID))
      const p3 = dispatch(depositTransactionHistory(UserID))
      // const p4 = dispatch(loanTransactionHistory(UserID))
      // const p5 = dispatch(creditcard(UserID))
      // const p6 = dispatch(peekDetail(UserID))
      Promise.all([p1,p2,p3]).then(()=>{
        dispatch(RemoveFirstLoad())
        setLoading(false)
    })
    } else{
      console.log("not first load")
    }
    },[]);*/

  return (
    <React.Fragment>
      <MainAppBar />
      <MainBottomNavigation />
    </React.Fragment>
  )
  
}

export default DashBoard;
