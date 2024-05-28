import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Home/Home.tsx";
import Login from "./Pages/Login/Login.tsx";
import Register from "./Pages/Register/Register.tsx";
import SearchList from "./Pages/SearchList/SearchList.tsx";
import Provinces from "./Pages/Provinces/Provinces.tsx";
import Province from "./Pages/Province/Province.tsx";
import Companies from "./Pages/Companies/Companies.tsx";
import Company from "./Pages/Company/Company.tsx";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Follows from "./Pages/Follows/Follows.tsx";
import Profile from "./Pages/Profile/Profile.tsx";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/${
  import.meta.env.VITE_API_VERSION
}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/searchlist",
    element: <SearchList />,
  },
  {
    path: "/provinces",
    element: <Provinces />,
  },
  {
    path: "/province/:provinceName",
    element: <Province />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
  {
    path: "/company/:companyId",
    element: <Company />,
  },
  {
    path: "/user/:userEmail/follows",
    element: <Follows />,
  },
  {
    path: "/user/:userEmail",
    element: <Profile />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  </React.StrictMode>
);
