import { Account, ForgotPassword, Login, Signup, UpdateDisplayName, UpdatePassword } from "./components/user";
import { NavbarComponent, PrivateRoute, UnPrivateRoute } from "./components/subcomponents";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

const Dashboard = lazy(() => import("./components/dashboard"));
export const baseRoute = "/effective-lamp"

const App = () => (
    <Router>
        <AuthProvider>
            <NavbarComponent/>
            <Routes>
                <Route exact path={baseRoute+"/"} element={<PrivateRoute/>}>
                    <Route exact path={baseRoute+"/"} element={<Suspense><Dashboard/></Suspense>}/>
                </Route>
                <Route path={baseRoute+"/signup"} element={<Signup/>}/>
                <Route path={baseRoute+"/login"} element={<UnPrivateRoute/>}>
                    <Route path={baseRoute+"/login"} element={<Login/>}/>
                </Route>
                <Route path={baseRoute+"/forgot-password"} element={<UnPrivateRoute/>}>
                    <Route path={baseRoute+"/forgot-password"} element={<ForgotPassword/>}/>
                </Route>
                <Route exact path={baseRoute+"/account"} element={<PrivateRoute/>}>
                    <Route path={baseRoute+"/account"} element={<Account/>}/>
                </Route>
                <Route exact path={baseRoute+"/update-display-name"} element={<PrivateRoute/>}>
                    <Route path={baseRoute+"/update-display-name"} element={<UpdateDisplayName/>}/>
                </Route>
                <Route exact path={baseRoute+"/update-password"} element={<PrivateRoute/>}>
                    <Route path={baseRoute+"/update-password"} element={<UpdatePassword/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    </Router>
)

export default App;
