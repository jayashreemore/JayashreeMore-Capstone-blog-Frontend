import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
//import Dropzone from "react-dropzone";
//import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import { modules } from "../components/moduleToolbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { updateUser } from "../../../backend/controllers/authController";

const validationSchema = yup.object({
  name: yup
    .string("Add a user name")
    .min(8, "User name should have a minimum of 8 characters.")
    .required("User is required"),
  email: yup
    .string("Add an email address")
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string("Add text content")
    .min(6, "text content should havea minimum of 6 characters ")
    .required("Password is required"),
  role: yup
    .string("Role either admin or user")
    .min(4, "text content should havea minimum of 6 characters ")
    .required("Role is required"),
});

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    // setFieldValue,
  } = useFormik({
    initialValues: {
      name,
      email,
      password,
      role,
    },

    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      updateUser(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  //show post by Id
  const singleUserById = async () => {
    // console.log(id)
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      console.log(data);
      setName(data.users.name);
      setEmail(data.users.email);
      setPassword(data.users.password);
      setRole(data.users.role);
      console.log("single User admin", data.users);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    singleUserById();
    // eslint-disable-next-line
  }, []);

  const updateUser = async (values) => {
    try {
      const { data } = await axios.put(`/api/update/user/${id}`, values);
      if (data.success === true) {
        toast.success("user updated");
        navigate("/admin/userManagement");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {" "}
          Edit User{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="name"
            label="User name"
            name="name"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="User name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="email"
            label="email "
            name="email"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="password"
            label="password "
            name="password"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="user password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="role"
            label="role "
            name="role"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="user role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.role && Boolean(errors.role)}
            helperText={touched.role && errors.role}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
            // disabled={loading}
          >
            Update user
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EditUser;
