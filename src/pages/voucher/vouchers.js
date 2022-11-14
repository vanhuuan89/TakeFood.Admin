import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card } from '@mui/material';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { voucherServices } from '../../services/voucher.services';

const blue = '#89D5C9'
const orange = '#FF8357'



const Vouchers = () => {
    const onButtonClick = (e, row) => {
        e.stopPropagation();
        alert(row.voucherId)
    };
    const columns = [
        { field: 'stt', headerName: 'STT', width: 50, sortable: false },
        { field: 'name', headerName: 'Voucher', width: 150, sortable: false },
        { field: 'description', headerName: 'Mô tả', width: 200, sortable: false },
        { field: 'minSpend', headerName: 'Min spend', width: 100, sortable: false },
        { field: 'maxDiscount', headerName: 'Max discount', width: 100, sortable: false },
        {
            field: 'amount',
            headerName: 'Mức giảm',
            width: 110,
            sortable: false,
        },
        { field: 'code', headerName: 'Mã', width: 100, sortable: false },
        { field: 'startDate', headerName: 'Ngày áp dụng', width: 200, sortable: false },
        { field: 'endDate', headerName: 'Ngày hết hạn', width: 200, sortable: false },
        {
            field: 'Action',
            headerName: 'Action',
            description: '',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return (
                    <div>
                        <span>
                            <IconButton sx={{ color: blue }}
                                onClick={(e) => onButtonClick(e, params.row)}
                                variant="contained">
                                <EditIcon>
                                </EditIcon>
                            </IconButton>
                        </span>
                        <span>
                            <IconButton sx={{ color: orange }}>
                                <DeleteIcon>
                                </DeleteIcon>
                            </IconButton>
                        </span>
                    </div>)
            }
        },
    ];

    const [pageState, setPageState] = React.useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
    })

    const [startDay, setStartDay] = React.useState(dayjs.unix(1318781876));

    const handleStartDayChange = (newValue) => {
        setStartDay(newValue);
    };
    const [endDay, setEndDay] = React.useState(dayjs.unix(1731468338));

    const handleEndDayChange = (newValue) => {
        setEndDay(newValue);
    };

    const [queryString, setQueryString] = useState("All")
    const [queryType, setQueryType] = useState("All")
    const [sortType, setSortType] = useState("Asc")
    const [sortBy, setSortBy] = useState("Name")
    const token = localStorage.getItem("AccessToken")

    const fetchData = async () => {
        setPageState(old => ({ ...old, isLoading: true }))
        var response = "";
        if (queryString == null || queryString == "") {
            setQueryString("All");
        }
        if (queryType.toString() == "All") {
            response = await voucherServices.getSystemVoucherPaging(pageState.page, pageState.pageSize, queryType, "All", sortBy, sortType, startDay.toISOString(), endDay.toISOString(), token)
        }else if (queryString) {
            response = await voucherServices.getSystemVoucherPaging(pageState.page, pageState.pageSize, queryType, queryString, sortBy, sortType, startDay.toISOString(), endDay.toISOString(), token)
            if (response.data) {
                const json = response.data
                console.log(json)
                setPageState(old => ({ ...old, isLoading: false, data: json.cards, total: json.total }))
            }
        }else{
            alert("Query string cannot be null or empty")
            return;
        }
        if (response.data) {
            const json = response.data
            console.log(json)
            setPageState(old => ({ ...old, isLoading: false, data: json.cards, total: json.total }))
        }
    }
    useEffect(() => {
        console.log(startDay.toISOString(), endDay.toISOString())
        fetchData()
    }, [pageState.page, pageState.pageSize])
    return (
        <div>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Card>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Text to search"
                                    inputProps={{ 'aria-label': 'Text To Search' }}
                                    value={queryString}
                                    onChange={e => { setQueryString(e.target.value) }}
                                    required
                                />
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={queryType}
                                    label="Search feld"
                                    onChange={e => { setQueryType(e.target.value) }}
                                >
                                    <MenuItem value={"All"}>Tất cả</MenuItem>
                                    <MenuItem value={"Name"}>Voucher</MenuItem>
                                    <MenuItem value={"Code"}>Mã</MenuItem>
                                </Select>
                            </Paper>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Ngày bắt đầu áp dụng"
                                    value={startDay}
                                    onChange={handleStartDayChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <DateTimePicker
                                    label="Ngày kết thúc"
                                    value={endDay}
                                    onChange={handleEndDayChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={sortBy}
                                label="Sort field"
                                onChange={e => { setSortBy(e.target.value) }}
                            >
                                <MenuItem value={"StartDate"}>Ngày bắt đầu</MenuItem>
                                <MenuItem value={"EndDate"}>Ngày kết thúc</MenuItem>
                                <MenuItem value={"Name"}>Voucher</MenuItem>
                                <MenuItem value={"Code"}>Code</MenuItem>
                            </Select>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={sortType}
                                label="Sort type"
                                onChange={e => { setSortType(e.target.value); }}
                            >
                                <MenuItem value={"Asc"}>Tăng dần</MenuItem>
                                <MenuItem value={"Desc"}>Giảm dần</MenuItem>
                            </Select>
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={fetchData}>
                                <SearchIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        autoHeight
                        rows={pageState.data}
                        rowCount={pageState.total}
                        loading={pageState.isLoading}
                        rowsPerPageOptions={[10, 30, 50, 70, 100]}
                        pagination
                        page={pageState.page - 1}
                        pageSize={pageState.pageSize}
                        paginationMode="server"
                        onPageChange={(newPage) => {
                            setPageState(old => ({ ...old, page: newPage + 1 }))
                        }}
                        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                        columns={columns}
                    />
                </div>
            </Box>
        </div >
    );
}

export default Vouchers