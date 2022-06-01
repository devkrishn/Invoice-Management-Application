import React from "react";
import { useState, useEffect } from "react";
import { addData, deleteData, getData, updateData, advanceSearch } from "./Data_load";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditData from "./EditData";
import AddDataModal from "./AddDataModal";
import DeleteDataCnf from "./DeleteDataCnf";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../styles/LandingPage.css";
import Header from "./Header";
import Footer from "./Footer";
import Button from '@mui/material/Button';
import AdvanceSearch from "./AdvanceSearch";
import axios from "axios";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sl_no",
    numeric: true,
    disablePadding: true,
    label: "Sl No",
  },
  {
    id: "business_code",
    numeric: true,
    disablePadding: false,
    label: "Business Code",
  },
  {
    id: "cust_number",
    numeric: true,
    disablePadding: false,
    label: "Customer Number",
  },
  {
    id: "clear_date",
    numeric: true,
    disablePadding: false,
    label: "Clear Date",
  },
  {
    id: "business_year",
    numeric: true,
    disablePadding: false,
    label: "Business Year",
  },
  {
    id: "doc_id",
    numeric: true,
    disablePadding: false,
    label: "Doc ID",
  },
  {
    id: "posting_date",
    numeric: true,
    disablePadding: false,
    label: "Posting Date",
  },
  {
    id: "document_create_date",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  {
    id: "due_in_date",
    numeric: true,
    disablePadding: false,
    label: "Due In Date",
  },
  {
    id: "invoice_currency",
    numeric: true,
    disablePadding: false,
    label: "Invoice Currency",
  },
  {
    id: "document_type",
    numeric: true,
    disablePadding: false,
    label: "Document Type",
  },

  {
    id: "posting_id",
    numeric: true,
    disablePadding: false,
    label: "Posting ID",
  },
  {
    id: "total_open_amount",
    numeric: true,
    disablePadding: false,
    label: "Total Open Amount",
  },

  {
    id: "baseline_create_date",
    numeric: true,
    disablePadding: false,
    label: "Baseline Create Date",
  },

  {
    id: "cust_payment_terms",
    numeric: true,
    disablePadding: false,
    label: "Customer Payment Terms",
  },

  {
    id: "invoice_id",
    numeric: true,
    disablePadding: false,
    label: "Invoice ID",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox style={{color:'white'}}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
            // onClick={}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{color:"white"}}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              style={{color:'white'}}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span classsl_no={classes.visuallyHidden}>
                  {order === "desc" }
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      classsl_no={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          classsl_no={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          classsl_no={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(0),
  },
  table: {
    minWidth: 750,
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [invoice,setInvoice] = useState({ sl_no: '',business_code: '', cust_number: '',clear_date: '',buisness_year: '',doc_id:'',posting_date:'',document_create_date:'',due_in_date:'',invoice_currency:'',document_type:'',posting_id:'',total_open_amount:'',baseline_create_date:'',cust_payment_terms:'',invoice_id:'' });
    const [ open,setOpen ] = useState(false);
    const { business_code, cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,sl_no } = invoice;


    const [openmodel,setopenmodal]=useState(false);
    const [opendelcnf,setopendelcnf]=useState(false);

    const advanceSearch = async ({sl_no,doc_id,cust_number,invoice_id,buisness_year}) => {
      let data = "doc_id=" + doc_id + "&cust_number=" + cust_number + "&invoice_id=" + invoice_id + "&buisness_year=" +buisness_year;
      axios.get("http://localhost:8080/Winter_Internship_Backend/Advanced_search?" + data).then((response) => {
          let data1 = response.data.advance;
          data1.map((invoice, index) => ({...invoice, "id": index}))
          setData([data1]);
      });
    }

    const changeHandleradd=(e)=>{
      const {name,value}=e.target;
      setInvoice({...invoice,[name]:value}); 
    }
    const submitHandleradd=async (e)=>{
      e.preventDefault();
    let response=await addData(invoice)
    if(response){
      setInvoice({business_code: '', cust_number: '',clear_date: '',buisness_year: '',doc_id:'',posting_date:'',document_create_date:'',due_in_date:'',invoice_currency:'',document_type:'',posting_id:'',total_open_amount:'',baseline_create_date:'',cust_payment_terms:'',invoice_id:'' })
    }
    console.log(response)
    }
    const addHandler=()=>{
      setopenmodal(true)
      }

      const handleCloseadd = async (update) => {
        if(update)
        {
          let response=await addData(invoice)
          window.location.reload(true);

        }
        setopenmodal(false)
      };

  const changeHandler = (e) => {
    const { name,value } = e.target;
    setInvoice({ ...invoice, [name]: value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(invoice);
    let response = await addData(invoice);
    if(response){
      setInvoice({ business_code: '', cust_number: '',clear_date: '',buisness_year: '',doc_id:'',posting_date:'',document_create_date:'',due_in_date:'',invoice_currency:'',document_type:'',posting_id:'',total_open_amount:'',baseline_create_date:'',cust_payment_terms:'',invoice_id:'' });
    }
  }

    const editHandler = () => {
      setOpen(true); 
    }
    
  const deleteHandler=()=>{
    setopendelcnf(true)
    }

    const checkHandler = (e, sl_no) => {
      if(e.target.checked){
      let editData = data.filter(invoice => invoice.sl_no == sl_no)[0];
      setInvoice(editData);
      }
  }
  const handleClose = async (update) => {
    if(update){
      let response = await updateData(invoice);
      window.location.reload(true);
    }
    setOpen(false);
  };
  const handleClosedelcnf = async (update) => {
    if(update)
    {
      let response=await deleteData(invoice.sl_no);
      window.location.reload(true);
    }
    setopendelcnf(false);
  };

    useEffect(async function () {
         setData(await getData());
    },[]);

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRow] = useState([]);
  const [opensearch,setOpensearch] = useState(false);
  // const classes = useStyles();
  useEffect(async () => {
    let data = await getData();
    setRow(data);
    console.log(data);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, sl_no) => {
    const selectedIndex = selected.indexOf(sl_no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // const searchHandler = async (update) => {
  //   if(update){
  //     let response = await advanceSearch(invoice);
  //   }
  //   setOpensearch(false);
  // }

  const handleClosesearch = async (update) => {
    if(update){
      let response = await advanceSearch(invoice);
    }
    setOpensearch(false);
  }
  const clickHandlerAdvance = () =>{
    setOpensearch(true);
  }

  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return <>
        <Header />
        <div style={{background: '#192e3c'}}>
        <div class="btn" >
        <Button id="btnpredict" style={{color:'white'}} variant="contained">PREDICT</Button>
        <Button id="btnanalytics" style={{color:'white'}} variant="outlined" >ANALYTICS VIEW</Button>
        <Button id="btnadv" style={{color:'white'}} variant="outlined" onClick={clickHandlerAdvance}>ADVANCE SEARCH</Button>
        <div class="input-group rounded">
          <input type="search" class="form-control rounded" placeholder="Search Customer Id" aria-label="Search" 
          aria-describedby="search-addon" style={{height:'50px', borderRadius:'10px',width:'250px',marginRight:'25px',marginLeft:'25px'}} />
           <span class="input-group-text border-0" id="search-addon">
           <i class="fas fa-search"></i>
           </span>
        </div>
        <Button id="btnadd" style={{color:'white'}} variant="outlined" onClick={addHandler}>ADD</Button>
        <Button id="btnedit" style={{color:'white'}} variant="outlined" onClick={editHandler} >EDIT</Button>
        <Button id="btndel" style={{color:'white'}} variant="outlined" onClick={deleteHandler}>DELETE</Button>
        <DeleteDataCnf open={opendelcnf} handleClose={handleClosedelcnf}/>
        </div>
        <EditData invoice_currency={ invoice_currency } cust_payment_terms={ cust_payment_terms } open={open} handleClose={handleClose} changeHandler={changeHandler} />
        <AddDataModal business_code={business_code} cust_number={cust_number} clear_date={clear_date} buisness_year={buisness_year} doc_id={doc_id}
     posting_date={posting_date} document_create_date={document_create_date} due_in_date={due_in_date} invoice_currency={invoice_currency} document_type={document_type}
     posting_id={posting_id} total_open_amount={total_open_amount} baseline_create_date={baseline_create_date} cust_payment_terms={cust_payment_terms} invoice_id={invoice_id} 
     handleClose={handleCloseadd} 
     open={openmodel} 
     changeHandleradd={changeHandleradd} 
     submitHandler={submitHandleradd}
     />
     <AdvanceSearch doc_id={doc_id} cust_number={cust_number} invoice_id={invoice_id} buisness_year={buisness_year} 
     open={opensearch}  handleClose={handleClosesearch} changeHandler={changeHandler} />
        

    <br />

    <div classsl_no={classes.root}>
      <Paper classsl_no={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer style={{background: '#192e3c'}}>
          <Table
            classsl_no={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sl_no)}
                      style={{color:'white'}}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox onClick={(e) => checkHandler(e, row.sl_no)}
                          style={{color:'white'}}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        style={{color:'white'}}
                        align="right"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.sl_no}
                      </TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.business_code}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.cust_number}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.clear_date}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.buisness_year}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.doc_id}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.posting_date}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>
                        {row.document_create_date}
                      </TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.due_in_date}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>
                        {row.invoice_currency}
                      </TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.document_type}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.posting_id}</TableCell>
                      <TableCell align="right" style={{color:'white'}}>
                        {row.total_open_amount}
                      </TableCell>
                      <TableCell align="right" style={{color:'white'}}>
                        {row.baseline_create_date}
                      </TableCell>
                      <TableCell align="right" style={{color:'white'}}>
                        {row.cust_payment_terms}
                      </TableCell>
                      <TableCell align="right" style={{color:'white'}}>{row.invoice_id}</TableCell>
                    </TableRow>
                    // </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          style={{background: '#192e3c',color:'white'}}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    </div>
    <Footer />
  </>
}
