import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, Fab } from "@mui/material";
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
        }
    }

    const {state} = useLocation();
    const { transaction_item, id } = state;

    const groupByYearMonth = transaction_item.reduce((acc, cur) => {
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
      
      console.log(groupByYearMonth);

      const groupByYMWeek = transaction_item.reduce((acc, cur) => {
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
      
    console.log(groupByYMWeek);
      
    const [value, setValue] = React.useState('Monthly');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
    };


  return (
    <Container maxWidth="lg">
        <Box sx={{mt: 10, mb: 10, width: '100%' }}>
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
        >
            <Tab value="Monthly" label="Monthly" />
            <Tab value="Weekly" label="Weekly" />
            
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