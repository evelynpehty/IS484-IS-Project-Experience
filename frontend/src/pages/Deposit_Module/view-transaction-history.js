import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, IconButton } from "@mui/material";
import SearchBar from '@mkyy/mui-search-bar';
import { useNavigate, useLocation } from "react-router-dom";

import moment from 'moment';
import _ from 'lodash'

export default function ColorTabs() {
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        },

        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "30px",
            fontSize: "12px",
            color: "#4B4948",
            backgroundColor: "#E5E7EC"
        },

        outlinedButton: {
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "30px",
            fontSize: "12px",
            color: "#E60000",
            border: "1px solid linear-gradient(to top right, #E69F9F, #E60000)"
        },

        card: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px"
        },

        card2: {
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent2: {
            paddingBottom: "16px",
            borderBottom: "1px dashed #BFBFBF"
        },

        positive: {
            color: "#3BB537"
        },

        negative: {
            color: "#E60000"
        },

        searchBar: {
            border: "1px solid black"
        }
    }

    const {state} = useLocation();
    const { transaction_item, id } = state;

    const [value, setValue] = React.useState('Monthly');
    // const [startDate, setStartDate] = React.useState(null);
    // const [endDate, setEndDate] = React.useState(null);
    

    function func_groupByYearMonth(transaction_item) {
        const result = transaction_item.reduce((acc, cur) => {
            const createdDate = new Date(cur.transactionDate)
            const year = createdDate.getFullYear() + " "
            const monthShortName = createdDate.toLocaleString('en-us', { month: 'long' })
          
            // Get year object corresponding to current item from acc (or insert if not present)
            const groupByYear = acc[year] = acc[year] || {};
          
            //Get month array corresponding to current item from groupByYear object (or insert if not present)
            const groupByMonth = groupByYear[monthShortName] = groupByYear[monthShortName] || [];
          
            // Add current item to current groupByMonth array
            groupByMonth.push(cur);
          
            return acc
          }, {});

        return result
      }
      var groupByYearMonth = func_groupByYearMonth(transaction_item)
      console.log(groupByYearMonth);

      function func_groupByYMWeek(transaction_item) {
        const result = transaction_item.reduce((acc, cur) => {
            const createdDate = new Date(cur.transactionDate)
            const year = createdDate.getFullYear() + " "
            const monthShortName = createdDate.toLocaleString('en-us', { month: 'long' })
            const weekNum = moment(createdDate).format('W')
            
            // Get year object corresponding to current item from acc (or insert if not present)
            const groupByYear = acc[year] = acc[year] || {};
          
            //Get month array corresponding to current item from groupByYear object (or insert if not present)
            const groupByMonth = groupByYear[monthShortName] = groupByYear[monthShortName] || [];
          
            //Get week array corresponding to current item from groupByMonth object (or insert if not present)
            const groupByWeek = groupByMonth[weekNum] = groupByMonth[weekNum] || [];
            groupByWeek.push(cur);
           
            return acc
          }, {});
          return result
      }

    var groupByYMWeek = func_groupByYMWeek(transaction_item)
    console.log(groupByYMWeek);
      
    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    /*const handleFilter = () =>{

        var filtered = transaction_item.filter(function (el)
        {
            const transactionDate = moment(el.transactionDate).format("DD-MM-YYYY")
            const newTransactionDate = moment(transactionDate, "DD-MM-YYYY")
            const sd = moment(startDate).format("DD-MM-YYYY")
            const new_sd = moment(sd, "DD-MM-YYYY")
            const ed = moment(ed).format("DD-MM-YYYY")
            const new_ed = moment(ed,"DD-MM-YYYY")
            
            return newTransactionDate.isBetween(new_sd, new_ed,undefined,[]) 
        })

        if(value === "Monthly"){
            groupByYearMonth = func_groupByYearMonth(filtered)
        }
        if(value === "Weekly"){
            groupByYMWeek = func_groupByYMWeek(filtered)
        }
        
        console.log(filtered)
    }*/

    const handleSearch = labelOptionValue => {
        //...
        console.log(labelOptionValue);
    };

  return (
    <Container maxWidth="lg">
        <Box sx={{mt: 10, mb: 10 }}>
            <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                <Typography style={ styles.label } variant="h6">All Transactions</Typography>
                <Button style={ styles.outlinedButton } variant="outlined">COLLAPSE ALL</Button>
            </Grid>

            <SearchBar
                style={ styles.searchBar }
                value=""
                // onChange={ newValue => setTextFieldValue(newValue) }
                onSearch={ handleSearch }
            />

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="secondary tabs example"
                centered
                sx={{ 
                    "& .Mui-selected": { color: "#4B4948", fontWeight: "bold" },
                    "& .MuiTabs-indicator": { backgroundColor: "#4B4948" }  
                }}
            >
                <Tab value="Monthly" label="Monthly" />
                <Tab value="Weekly" label="Weekly" />
                <Tab value="Daily" label="Daily" />
            </Tabs>
    
        <Card style={ styles.card2 } elevation={4}>
        { value === "Monthly" &&
           Object.keys(groupByYearMonth).map(year => {
            return (
                <>
                    {Object.keys(groupByYearMonth[year]).map( (month) => {
                        return(
                            <>
                                <p>{month} {year.trim()}</p>
                                {groupByYearMonth[year][month].map((item,index)=>{
                                    return <p>{item.transactionAmount}</p>
                                })}
                            </>
                        )
                    }
                    )}
                </>
            )
          })
        }
        { value === "Weekly" &&
           Object.keys(groupByYMWeek).map(year => {
            return (
                <>
                    {Object.keys(groupByYMWeek[year]).map( // <--- Also notice here, we have wrapped it in curly braces, because it is an "expression" inside JSX.
                    (month) => {
                        return (
                            <>
                                { Object.keys(groupByYMWeek[year][month]).map(
                                    (week) => { 
                                        return(
                                            <>
                                                <p>{year} {month} {week}</p>
                                                {groupByYMWeek[year][month][week].map((item,index)=>{
                                                    return <p>{item.transactionAmount}</p>
                                                })}
                                            </>
                                        )                         
                                })}
                            </>
                        )
                    }
                )}
                </>
            )
          })
        }

        </Card>
        </Box>
    </Container>
  );
}