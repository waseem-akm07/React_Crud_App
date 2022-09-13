import React from 'react';
import axios from 'axios';
import localStorage from 'localStorage';
import EmpTable from '../table/EmpTable';
import SweetAlert from 'sweetalert-react';
import Department from '../department/Department';
import FindDepartment from '../department/FindDepartment';
import 'sweetalert/dist/sweetalert.css';
import { BASE_URL, GET_EMPLOYEE, POST_EMPLOYEE, DELETE_EMPLOYEE, PUT_EMPLOYEE, GET_EMPLOYEE_BY_DEPARTMENT } from '../../constants/Constants';



class AddEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            itemIndex: null,
            name: '',
            address: '',
            salary: '',
            text: 'Add',
            token: null,
            show: false,
            message: null,
            DepartmentId: null,
            DepartmentName: null,
            allDepartment: null,
            byDepartmentId: null
        }
    }


    onNameValue = (e) => {
        this.setState({ name: e.target.value })
    }
    onAddressValue = (e) => {
        this.setState({ address: e.target.value })
    }
    onSalaryValue = (e) => {
        this.setState({ salary: e.target.value })
    }


    /**
     * set state before render function
     * @param {* to store token in state} state 
     */
    static getDerivedStateFromProps(props, state) {
        return state.token = JSON.parse(localStorage.getItem('token'))
    }


    /**
     * To refresh grid on update and delete action
     */
    loadEmployee = (isfromUpdate = false) => {
        axios({
            url: BASE_URL + GET_EMPLOYEE,
            method: 'GET',
            headers: {
                Authorization: `bearer ${this.state.token.access_token}`
            }
        }).then(res => {
            if (isfromUpdate) {
                this.setState({
                    list: res.data,
                    name: '',
                    salary: '',
                    address: '',
                    text: 'Add'
                })
            } else {
                this.setState({ list: res.data })
            }
        }).catch(function (error) {
            console.log(error);
        })
    }


    /**
     * authentication on url login
     */
    componentDidMount() {
        if (this.state.token === null) {
           this.props.history.push('/')
           this.setState({ show: true, message: 'Please!! LOGIN' })
        } else {
            this.fetchEmployee();
        }
    }


    /**
     * Get all data from database
     */
    fetchEmployee = () => {
        axios({
            url: BASE_URL + GET_EMPLOYEE,
            method: 'GET',
            headers: { Authorization: `bearer ${this.state.token.access_token}` }
        }).then(res => {
            this.setState({ list: res.data })
        }).catch(function (error) {
            console.log(error);
        })
    }


    /**
     * For ADD/UPDATE data in state/database
     */
    onAddHandle = () => {
        var { text, itemIndex, name, address, salary, list, DepartmentId, DepartmentName } = this.state;

        // Here we Update data in database
        // Check itemIndex not null and >=0 on update
        if (text === 'Update' && itemIndex != null && itemIndex > -1) {

            ///Find employeeId for updata data in database
            var fetchData = list.find((item, index, EmployeeId) => index === itemIndex)
            var id = fetchData.EmployeeId
            var updateData = null;
            updateData = ({ EmployeeId: id, EmployeeName: name, EmployeeAddress: address, EmployeeSalary: salary, DepartmentId: DepartmentId, DepartmentName: DepartmentName })

            ///if id !=0 then update data in database
            if (id !== 0) {
                axios.put(BASE_URL + PUT_EMPLOYEE + id,
                    updateData, {
                    headers: {
                        Authorization: `bearer ${this.state.token.access_token}`
                    }
                }).then(res => {
                    if (res !== null) {
                        this.loadEmployee(true);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
            ///Here we update data in state
            else {
                ///Fill data into list of state
                list[itemIndex].EmployeeName = name;
                list[itemIndex].EmployeeAddress = address;
                list[itemIndex].EmployeeSalary = salary;
                list[itemIndex].DepartmentId = DepartmentId;
                list[itemIndex].DepartmentName = DepartmentName
                this.setState({ list: list, text: "Add", itemIndex: null, name: "", address: "", salary: "", DepartmentId: "", DepartmentName: "" });
            }
        }
        // Here we Add new data into state
        else {
            if (this.state.name.length === 0 && this.state.address.length === 0 && this.state.salary.length === 0) {
                this.setState({ show: true, message: 'Fields can not be empty' })
                // alert('Fields can not be empty')
            } else {
                if (this.state.DepartmentId === null) {
                    this.setState({ show: true, message: 'Department is not selected' })
                } else {
                    var salaryRegex = /^[1-9][0-9](?!0$)[0-9][1-9]?\d+$/

                    var nameRegex = /^[A-Za-z]+$/;
                    if (this.state.name.length > 0 && this.state.address.length !== 0 && this.state.salary.length !== 0) {
                        if (nameRegex.test(this.state.name) === true && salaryRegex.test(this.state.salary) === true && nameRegex.test(this.state.address) === true) {
                            ///add new data into state list
                            const list = [...this.state.list, { EmployeeId: 0, EmployeeName: this.state.name, EmployeeAddress: this.state.address, EmployeeSalary: this.state.salary, DepartmentId: this.state.DepartmentId, DepartmentName: this.state.DepartmentName }];
                            this.setState({
                                list,
                                name: '',
                                address: '',
                                salary: '',
                                DepartmentId: ''
                            });
                        } else {
                            this.setState({
                                show: true,
                                message: '1.Special characters not allow in name'
                                    + ' 2.Salary should be greater then 1000' +
                                    ' 3.Num not allow in Address'
                            })
                            // alert('Validation: 1.Special characters not allow in name                            2.Salary should be greater then 1000                                                       3.Num not allow in Address')
                        }
                    }
                }
            }

            if (this.state.name.length !== 0 && this.state.address.length === 0 && this.state.salary.length !== 0) {
                this.setState({ show: true, message: 'Address can not be empty' })
            } else if (this.state.name.length === 0 && this.state.address.length !== 0 && this.state.salary.length !== 0) {
                this.setState({ show: true, message: 'Name can not be empty' })
            } else if (this.state.name.length !== 0 && this.state.address.length !== 0 && this.state.salary.length === 0) {
                this.setState({ show: true, message: 'Salary can not be empty' })
            }
        }
    }


    /**
     * Filling textboxes on edit action
     */
    onEditHandle = (itemIndex) => {
        // find itemIndex of seleted item
        const list = this.state.list.find((item, index) => index === itemIndex);
        // Fill textboxes
        this.setState({
            itemIndex,  // store index in state
            name: list.EmployeeName,
            address: list.EmployeeAddress,
            salary: list.EmployeeSalary,
            DepartmentId: list.DepartmentId,
            DepartmentName: list.DepartmentName,
            text: 'Update'  // change button text for update
        });
    }


    /**
     * Delete data from state/database
     */
    onDeleteHandle = (e) => {
        var fetchData = this.state.list.find((item, index, EmployeeId) => index === e);
        let id = fetchData.EmployeeId;

        // Delete data in database if employee id !=0
        if (id !== 0) {
            axios.delete(BASE_URL + DELETE_EMPLOYEE + id, {
                headers: { Authorization: `bearer ${this.state.token.access_token}` }
            }).then(res => {
                // if((res).error=='Invalid_grant'){ }
                if (res !== null) {
                    this.loadEmployee();
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
        // Delete data from state list where id = 0
        else {
            const list = this.state.list.filter((item, index) => index !== e);
            this.setState({ list })
        }
    }


    /**
     * Getting deparmentId from dropdown
     */
    onDropDownHandle = (data) => {
        this.setState({ DepartmentId: data.DepartmentId })
        this.setState({ DepartmentName: data.DepartmentName })
    }


    /**
     * Bind Grid by selected Department 
     */
    onDepartmentHandle = (data) => {
        if (data == null) {
            this.loadEmployee();
        } else {
            if (data.length > 0) {
                let Id = data.map((item) => item.value)

                axios.post(BASE_URL + GET_EMPLOYEE_BY_DEPARTMENT, { Id }, {
                    headers: { Authorization: `bearer ${this.state.token.access_token}` }
                }).then(res => {
                    this.setState({ list: res.data })
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                this.loadEmployee();
            }
        }
    }


    /**
     * To store all state data in database
     */
    onSyncHandle = () => {
        let addData = [];
        //Filtring data which in not store in data by employeeId
        addData = JSON.stringify(this.state.list.filter((item) => item.EmployeeId === 0))
        let dataemp = JSON.parse(addData)

        axios.post(BASE_URL + POST_EMPLOYEE,
            dataemp, {
            headers: { Authorization: `bearer ${this.state.token.access_token}` }
        }).then(res => {
            if (res !== null) {
                this.loadEmployee();
            }
        }).catch(function (error) {
            console.log(error);
        })
    }


    /**
     * For canceling action
     */
    onCancelHandle = () => {
        this.setState({
            name: '',
            address: '',
            salary: '',
            text: 'Add'
        })
    }


    /**
     * Logout action
     */
    onLogoutHandle = () => {
        localStorage.removeItem('token');
        this.props.history.push('/')
    }


    render() {

        return (
            <div className="App">
                <br />
                <label >Employee Name</label> <span> : </span>
                <input type="text" onChange={this.onNameValue} value={this.state.name} placeholder="Enter Name " required></input>
                <br /><br />

                <label >Employee Address</label> <span>: </span>
                <input type="text" placeholder="Enter Address" onChange={this.onAddressValue} value={this.state.address} required></input>
                <br /><br />

                <label >Employee Salary</label> <span> : </span>
                <input type="text" placeholder="Enter Salary" onChange={this.onSalaryValue} value={this.state.salary} required></input>
                <br /><br />

                {/* <!-- Post Department Dropdown --> */}
                <Department onGetSelectedId={this.onDropDownHandle} />

                <br />
                <input type="submit" className="btn btn-success" style={{ width: "100px" }} onClick={this.onAddHandle} value={this.state.text} />
                <span> </span>
                <input type="submit" className="btn btn-danger" style={{ width: "100px" }} onClick={this.onCancelHandle} value="Cancel" />
                <br /><br />

                <input className="btn btn-warning " onClick={this.onSyncHandle} style={{ width: "150px", right: "90%" }} type="submit" value="SyncAll" />
                <span> </span>
                <input className="btn btn-danger " onClick={this.onLogoutHandle} style={{ width: "150px", right: "90%" }} type="submit" value="LogOut" />
                <br /><br />

                {/* <!-- Grid Department Dropdown --> */}
                <FindDepartment SelectedValue={this.onDepartmentHandle} />

                {/* <!-- Grid --> */}
                {this.state.list && this.state.list.length > 0 &&
                    <EmpTable
                        arrayList={this.state}
                        onEdit={this.onEditHandle}
                        onDelete={this.onDeleteHandle}
                        show={this.state.checked}
                        role={this.state.token.userName}
                    />
                }

                {/* <!-- alert --> */}
                <SweetAlert
                    show={this.state.show}
                    title="Warning Message"
                    text={this.state.message}
                    onConfirm={() => this.setState({ show: false, message: null })}
                ></SweetAlert>
            </div>
        )
    }
}
export default AddEmployee;