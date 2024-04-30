import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const displayUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data.users);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayUsers();
  }, []);

  //delete user by Id
  const deleteUserById = async (e, id) => {
    // console.log(id)
    if (window.confirm("Are you sure you want to delete this User?")) {
      try {
        const { data } = await axios.delete(`/api/delete/user/${id}`);
        if (data.success === true) {
          toast.success(data.message);
          displayUsers();
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: 50,
          }}
        >
          <Link to={`/admin/users/edit/${value.row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => deleteUserById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
        Users List
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/post/create"
          >
            Create User
          </Link>{" "}
        </Button>
      </Box>
      <Paper sx={{ bgcolor: "white" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "black",
              },
              color: "black",
              [`& .${gridClasses.row}`]: {
                bgcolor: "white",
              },
            }}
            rows={users}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UserManagement;
