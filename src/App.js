import { Account, ForgotPassword, Login, Signup, UpdateDisplayName, UpdatePassword } from "./components/user";
import { NavbarComponent, PrivateRoute, UnPrivateRoute } from "./components/subcomponents";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

const Dashboard = lazy(() => import("./components/dashboard"));

const App = () => (
    <Router>
        <AuthProvider>
            <NavbarComponent/>
            <Routes>
                <Route exact path="/" element={<PrivateRoute/>}>
                    <Route exact path="/" element={<Suspense><Dashboard/></Suspense>}/>
                </Route>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<UnPrivateRoute/>}>
                    <Route path="/login" element={<Login/>}/>
                </Route>
                <Route path="/forgot-password" element={<UnPrivateRoute/>}>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                </Route>
                <Route exact path="/account" element={<PrivateRoute/>}>
                    <Route path="/account" element={<Account/>}/>
                </Route>
                <Route exact path="/update-display-name" element={<PrivateRoute/>}>
                    <Route path="/update-display-name" element={<UpdateDisplayName/>}/>
                </Route>
                <Route exact path="/update-password" element={<PrivateRoute/>}>
                    <Route path="/update-password" element={<UpdatePassword/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    </Router>
)

export default App;
