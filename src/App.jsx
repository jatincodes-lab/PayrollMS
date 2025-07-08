import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import RoleBaseRoute from "./utils/RoleBaseRoute.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentLists from "./components/department/DepartmentLists.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartment from "./components/department/EditDepartment.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import View from "./components/employee/View.jsx";
import Edit from "./components/employee/Edit.jsx";
import AddSalary from "./components/salary/Add.jsx";
import ViewSalary from "./components/salary/ViewSalary.jsx";
import Employee from "./pages/Employee.jsx";
import WelcomeCard from "./components/EmployeeDashboard/WelcomeCard.jsx";
import Profile from "./components/EmployeeDashboard/Profile.jsx";
import LeaveList from "./components/leave/List.jsx";
import AddLeave from "./components/leave/AddLeave.jsx";
import Setting from "./components/employee/Setting.jsx";
import Table from "./components/leave/Table.jsx";
import Details from "./components/leave/Details.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/adminDashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/adminDashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin"]}>
                <Admin />
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route
            path="/adminDashboard/departments"
            element={<DepartmentLists />}
          ></Route>
          <Route
            path="/adminDashboard/addDepartment"
            element={<AddDepartment />}
          ></Route>
          <Route path="/adminDashboard/addEmployee" element={<Add />}></Route>
          <Route
            path="/adminDashboard/department/:_id"
            element={<EditDepartment />}
          ></Route>
          <Route path="/adminDashboard/employees/:_id" element={<View />} />
          <Route
            path="/adminDashboard/employees/edit/:_id"
            element={<Edit />}
          />
          <Route
            path="/adminDashboard/employees/salary/:_id"
            element={<ViewSalary />}
          />
          <Route path="/adminDashboard/employees" element={<List />} />
          <Route path="/adminDashboard/leaves" element={<Table />} />
          <Route path="/adminDashboard/leaves/:id" element={<Details />} />
          <Route path="/adminDashboard/salary/add" element={<AddSalary />} />
          <Route path="/adminDashboard/employees/leaves/:id" element={<LeaveList />} />
          <Route path="/adminDashboard/settings" element={<Setting />} />
        </Route>
        <Route
          path="/employeeDashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin", "employee"]}>
                <Employee />
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<WelcomeCard />} />
          <Route
            path="/employeeDashboard/profile"
            element={<Profile />}
          ></Route>
          <Route
            path="/employeeDashboard/leaves/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employeeDashboard/addLeaves"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employeeDashboard/salary/:_id"
            element={<ViewSalary />}
          ></Route>
          <Route
            path="/employeeDashboard/settings"
            element={<Setting />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
