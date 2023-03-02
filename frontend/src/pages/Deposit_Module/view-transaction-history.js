import * as React from 'react';
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Typography, IconButton, Accordion, AccordionDetails, AccordionSummary, AppBar, Toolbar } from "@mui/material";
import SearchBar from '@mkyy/mui-search-bar';
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { ReactComponent as Arrow } from "../../assets/icons/arrow-red.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/filter-line-red.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
            border: "1px solid #E60000"
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
            border: "1px solid #BFBFBF"
        },
        
        iconButton: {
            border: "1px solid #BFBFBF",
            borderRadius: "10px"
        },

        boxContent: {
            marginBottom: 0
        },

        boxContent2: {
            marginBottom: 10
        }
    }

    const {state} = useLocation();
    const { transaction_item, id } = state;

    const [value, setValue] = React.useState('Monthly');
    
    // Group by Month
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

    // Group by Week
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


    // const collapse = () => {
    //     return false;
    //   };

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
    <React.Fragment>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="primary">
        <Toolbar>
            <Arrow component={ Link } to={ `/account-details/${id}` } />
            <Typography component={ Link } to={ `/account-details/${id}` } sx={{ flexGrow: 1, fontWeight: "bold", ml: 2 }} color="#4B4948">
                Account Overview
            </Typography>
        </Toolbar>
        </AppBar>
    </Box>
    <Container maxWidth="lg">
        <Box sx={{mt: 10, mb: 10 }}>
            <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                <Typography style={ styles.label } variant="h6">All Transactions</Typography>
                <Button style={ styles.outlinedButton } variant="outlined">COLLAPSE ALL</Button>
            </Grid>

            <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                <SearchBar
                    style={ styles.searchBar }
                    value=""
                    // onChange={ newValue => setTextFieldValue(newValue) }
                    onSearch={ handleSearch }
                    placeholder="Search Transactions"
                />
                <IconButton style={ styles.iconButton } aria-label="delete">
                    <FilterIcon />
                </IconButton>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="secondary tabs example"
                    centered
                    sx={{ 
                        "& .MuiTab-root.Mui-selected": { color: "#4B4948", fontWeight: "bold" },
                        "& .MuiTabs-indicator": { backgroundColor: "#4B4948" }
                    }}
                >
                    <Tab value="Monthly" label="Monthly" />
                    <Tab value="Weekly" label="Weekly" />
                    <Tab value="Daily" label="Daily" />
                </Tabs>
            </Box>

            {/* <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion> */}

        {/* Monthly Transaction History */}
        { value === "Monthly" && Object.keys(groupByYearMonth).map(year => {
            return (
                <>
                    { Object.keys(groupByYearMonth[year]).map( (month, index) => {
                        return(
                            <>
                                <Accordion defaultExpanded>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel-content`}
                                    id={`panel-content-header`}
                                    sx={{ backgroundColor: "#F8F8F8" }}
                                    >
                                        <Typography sx={{ fontWeight: "bold", color: "#4B4948" }}>
                                            {month.substring(0, 3).toUpperCase()} {year.trim()}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            { groupByYearMonth[year][month].map((item,index) => {
                                                return (
                                                    <Box style={ (index === groupByYearMonth[year][month].length - 1) ? styles.boxContent : styles.boxContent2 }>
                                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="#4B4948">
                                                                {item.transactionID}
                                                            </Typography>
                                                            <Typography style={ (item.accountFrom === id) ? styles.negative : styles.positive } sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                                                {(item.accountFrom === id) ? `- SGD $${ item.transactionAmount.toLocaleString("en-US") }` : `SGD $${ item.transactionAmount.toLocaleString("en-US") }` }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                            <Typography sx={{ fontSize: 12 }} color="#9197A4">
                                                                { item.transactionDescription }
                                                            </Typography>
                                                            <Typography sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                                                { item.transactionDate.replace(" GMT", "") }
                                                            </Typography>
                                                        </Grid>
                                                    </Box>
                                                ) 
                                            })}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        )
                    }
                    )}
                </>
            )
          })
        }
        { value === "Weekly" &&
           Object.keys(groupByYMWeek).map((year, index) => {
            return (
                <>
                    {Object.keys(groupByYMWeek[year]).map((month, index) => {
                        return (
                            <>
                                { Object.keys(groupByYMWeek[year][month]).map((week, index) => { 
                                    return(
                                        <>
                                            <Accordion defaultExpanded>
                                                <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                sx={{ backgroundColor: "#F8F8F8" }}
                                                >
                                                    <Typography sx={{ fontWeight: "bold", color: "#4B4948" }}>
                                                        { year.trim() } { month.substring(0, 3).toUpperCase() }  ( WEEK { week % 4 } )
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {groupByYMWeek[year][month][week].map((item,index)=>{
                                                        return (
                                                            <Box>
                                                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                                    <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="#4B4948">
                                                                        {item.transactionID}
                                                                    </Typography>
                                                                    <Typography style={ (item.accountFrom === id) ? styles.negative : styles.positive } sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                                                        {(item.accountFrom === id) ? `- SGD $${ item.transactionAmount.toLocaleString("en-US") }` : `SGD $${ item.transactionAmount.toLocaleString("en-US") }` }
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                                    <Typography sx={{ fontSize: 12 }} color="#9197A4">
                                                                        { item.transactionDescription }
                                                                    </Typography>
                                                                    <Typography sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                                                        { item.transactionDate.replace(" GMT", "") }
                                                                    </Typography>
                                                                </Grid>
                                                            </Box>
                                                        ) 
                                                    })}
                                                </AccordionDetails>
                                            </Accordion>
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
        </Box>
    </Container>
    </React.Fragment>
  );
}