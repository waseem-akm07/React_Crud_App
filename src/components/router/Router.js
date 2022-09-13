import React from 'react';
import Login from '../login/Login';
import AddEmployee from '../additem/AddEmployee';
import Register from '../register/Register';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


class Router extends React.Component {

    render() {
        return (

            ///Routing
                <BrowserRouter>
                    <div className="App">
                        <br />
                        <button className="btn btn-default">  <Link to="/">Login page</Link></button>
                        <span> </span>
                        <button className="btn btn-default"> <Link to="/employee">Employee page</Link></button>
                        <span> </span>
                        <button className="btn btn-default"> <Link to="/register"> Register page</Link></button>



                        <Switch>
                            <Route exact path="/" component={Login}>
                            </Route>
                            <Route exact path="/employee" component={AddEmployee}>
                            </Route>
                            <Route exact path="/register" component={Register}>
                            </Route>
                        </Switch>


                    </div>
                </BrowserRouter>

        );
    }
}
export default Router