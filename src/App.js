import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import LogIn from "./pages/LogIn";
import AdminDashboard from "./admin/AdminDashboard.js";
import CreatePost from "./admin/CreatePost.js";
import EditPost from "./admin/EditPost.js";
import EditUser from "./admin/EditUser.js";
import AdminRoute from "./components/AdminRoute.js";
import UserRoute from "./components/UserRoute.js";
import Layout from "./admin/global/Layout.js";
import UserDashboard from "./user/UserDashboard.js";
import SinglePost from "./pages/SinglePost.js";
import Register from "./pages/Register.js";
import UserManagement from "./admin/UserManagement";

//HOC
const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const EditUserHOC = Layout(EditUser);
const UserDashboardHOC = Layout(UserDashboard);
const UserManagementHOC = Layout(UserManagement);

const App = () => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/userManagement"
                element={
                  <AdminRoute>
                    <UserManagementHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/post/create"
                element={
                  <AdminRoute>
                    <CreatePostHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/post/edit/:id"
                element={
                  <AdminRoute>
                    <EditPostHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users/edit/:id"
                element={
                  <AdminRoute>
                    <EditUserHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/user/dashboard"
                element={
                  <UserRoute>
                    <UserDashboardHOC />
                  </UserRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </Provider>
    </>
  );
};

export default App;
