import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Typography, IconButton, Accordion, AccordionDetails, AccordionSummary, AppBar, Toolbar } from "@mui/material";
import SearchBar from '@mkyy/mui-search-bar';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/icons/arrow-red.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/filter-line-red.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import moment from 'moment';

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
        },
        
        chipSelected:{
            backgroundColor:'#ECECEC'
        }, 
        chipUnSelected:{
            backgroundColor:'white'
        }
    }

    const {state} = useLocation();
   
    const { transaction_item, id, selectedFilter } = state;
    /* handle change in By Year or By Month*/
    const [value, setValue] = React.useState('Monthly');
    const [transFilter, setTransFilter] = React.useState("");
    const [transactionDisplay, setTransDisplay] = React.useState(transaction_item);

    React.useEffect(() => {
        if(selectedFilter === undefined){
            setTransFilter("All")
        } else{
            setTransFilter(selectedFilter)
            setTransDisplay(filter_transaction_item(selectedFilter))
        }
    }, []);


    /*const handleSearch = labelOptionValue => {
        //...
        console.log(labelOptionValue);
    };*/

    /* Filter - Menu Item */
    const [open, setOpen] = React.useState(false);
    
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }
        setOpen(false);
    };


    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    var current_Year = moment().year()
    const currentMonth = moment().month()
    const sixMonthAgo = moment().subtract(5, 'months').format("MMM")
    var months = ["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var monthRange = []
    const indexof = months.indexOf(sixMonthAgo)
    const limit = indexof + 5
    for (let i = indexof; i <= limit; i++) {
        var y = current_Year
        if((i%12) > currentMonth){
            y = current_Year - 1
        }
        const label = months[i%12] + " " + y
        monthRange.push(label)
    }

    var yearRange = []
    for(let x = 6; x >= 1; x--){
        yearRange.push(current_Year)
        current_Year -= 1
    }

    yearRange = yearRange.reverse()

    /* handle chip value - months or year */
    const [chipValue, setChipValue] = React.useState(monthRange);
    const [selectedChip, setSelectedChip] = React.useState("");
   
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

    const [searchText, setSearchText] = React.useState("");
    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchText(text);
        /*
        if(text !== ""){
            const filteredData = transactionDisplay.filter((item) => {
                return Object.values(item.transactionDescription).join('').toLowerCase().includes(text.toLowerCase())
            })
            setTransDisplay(filteredData)
        } else{
            handleFilter(transFilter)
        }*/
        
    };

    function filter_transaction_item(filter){
        var result;
        if(filter === "All"){
            result = transaction_item.filter(function (el)
            {
            return el.accountFrom === id || el.accountTo === id
            })
        }
        else if(filter === "Income"){
            result = transaction_item.filter(function (el)
            {
            return el.accountTo === id
            })
        } 
        else if(filter === "Expense"){
            result = transaction_item.filter(function (el)
            {
            return el.accountFrom === id
            })
        }
        return result
    }
    
    const handleChange = (event, newValue) => {  
        setValue(newValue);
        
        if(newValue === "Yearly"){
            setChipValue(yearRange)
            setSelectedChip("")
            setTransDisplay(func_groupByYearMonth(filter_transaction_item(transFilter)))
        } 

        if(newValue === "Monthly"){
            setChipValue(monthRange)
            setSelectedChip("")
            setTransDisplay(filter_transaction_item(transFilter))
        }
    };

    function handleChip(item){
        if (item === selectedChip){
            item = ""
            setSelectedChip(item)
        } else{
            setSelectedChip(item)
        }
        
        if(item !== ""){
            if(value === "Monthly"){
                const yy = item.split(" ")[1]
                const mm = item.split(" ")[0];
    
                const result = filter_transaction_item(transFilter).filter(function (el)
                {
                    const transactionDate = moment(el.transactionDate)
                    return transactionDate.month() === months.indexOf(mm) && transactionDate.year().toString() === yy
                })
    
                setTransDisplay(result)
            }
    
            if(value === "Yearly"){
                const result = filter_transaction_item(transFilter).filter(function (el)
                {
                    const transactionDate = moment(el.transactionDate)   
                    return transactionDate.year().toString() === item.toString()
                })
                
                setTransDisplay(func_groupByYearMonth(result))
            }
        } else{
            handleFilter(transFilter)
        }
    };
    
    function handleFilter(f){
        setTransFilter(f)

        if(selectedChip===""){
            if(value === "Yearly"){
                setTransDisplay(func_groupByYearMonth(filter_transaction_item(f)))
            } 
    
            if(value === "Monthly"){
                setTransDisplay(filter_transaction_item(f))
            }
        }
        else{
            if(value === "Monthly"){
                const yy = selectedChip.split(" ")[1]
                const mm = selectedChip.split(" ")[0];
    
                const result = filter_transaction_item(f).filter(function (el)
                {
                    const transactionDate = moment(el.transactionDate)
                    return transactionDate.month() === months.indexOf(mm) && transactionDate.year().toString() === yy
                })
    
                setTransDisplay(result)
            }
    
            if(value === "Yearly"){
                const result = filter_transaction_item(f).filter(function (el)
                {
                    const transactionDate = moment(el.transactionDate)   
                    return transactionDate.year().toString() === selectedChip.toString()
                })
                
                setTransDisplay(func_groupByYearMonth(result))
            }
        }
    }
    
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
            </Grid>

            <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                <SearchBar
                    style={ styles.searchBar }
                    value={searchText}
                    onChange={ newValue => setSearchText(newValue) }
                    // onChange={handleSearch}
                    onSearch={ handleSearch }
                    placeholder="Search Transactions"
                />
                <IconButton 
                style={ styles.iconButton } 
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                    <FilterIcon />
                </IconButton>
                
                <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                        >
                            <MenuItem name="All" sx={( transFilter === "All") ? styles.chipSelected : styles.chipUnSelected } onClick={() => handleFilter("All")}>All</MenuItem>
                            <MenuItem sx={{color: styles.positive }} style={( transFilter === "Income") ? styles.chipSelected : styles.chipUnSelected } onClick={() => handleFilter("Income")}>Income</MenuItem>
                            <MenuItem sx={{color: styles.negative }} style={( transFilter === "Expense") ? styles.chipSelected : styles.chipUnSelected } onClick={() => handleFilter("Expense")}>Expense</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
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
                    <Tab value="Monthly" label="By Month" />
                    <Tab value="Yearly" label="By Year" />
                </Tabs>
            </Box>
            <Stack direction="row" spacing={1}>
                {
                    chipValue.map((item, index) => {
                        return <Chip label={item} id={index} sx={(item === selectedChip) ? styles.chipSelected : styles.chipUnSelected } variant="outlined" onClick={() => handleChip(item)} />
                    })
                }
            </Stack>

            {/* By Year */}
            { value === "Yearly" && Object.keys(transactionDisplay).map(year => {
            return (
                <>
                    { Object.keys(transactionDisplay[year]).map( (month, index) => {
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
                                            { transactionDisplay[year][month].map((item,index) => {
                                                return (
                                                    <Box style={ (index === transactionDisplay[year][month].length - 1) ? styles.boxContent : styles.boxContent2 }>
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


            {/* By Month */}
            { value === "Monthly" && transactionDisplay.map((item,index)=> {
                    return (
                        <>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    sx={{ backgroundColor: "#F8F8F8" }}
                                    >
                                        <Typography sx={{ fontWeight: "bold", color: "#4B4948" }}>
                                            { moment(item.transactionDate).format('dddd, Do MMM YYYY') } 
                                        </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
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
                                </AccordionDetails>
                            </Accordion>  
                        </>
                    )
                })}
        </Box>
    </Container>
    </React.Fragment>
  );
}