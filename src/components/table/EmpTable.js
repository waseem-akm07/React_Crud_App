import React from 'react';
import Icon from '../image/savedata.jpg';
import ReactTable from 'react-table';
import "react-table/react-table.css"


export default class EmpTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    
    /**
     * to store list of employees before rendering function
     * @param {* get employee list in props} props 
     * @param {* set list in state} state 
     */
    static getDerivedStateFromProps(props, state) {
        return state.list = props.arrayList.list
    }


    render() {
        /**
         * Generating React Table Columns
         */
        const columns = [
            {
                Header: "Image",
                accessor: "EmployeeId",
                Cell: props => {
                    if (props.original.EmployeeId > 0) {
                        return (
                            <div>
                                <img src={Icon} style={{ "width": "50px", "height": "50px" }} alt="Loading..."></img>
                            </div>
                        )
                    }
                },
                width: 180,
                sortable: false,
                filterable: false
            },
            {
                Header: "Employee Name",
                accessor: "EmployeeName",
            },
            {
                Header: "Address",
                accessor: "EmployeeAddress",
            },
            {
                Header: "Salary",
                accessor: "EmployeeSalary",
            },
            {
                Header:'Department',
                accessor:"DepartmentName"
            },
            {
                Header: "Action",
                accessor: '"action',
                Cell: props => {
                    return (
                        this.props.role === 'admin1@gmail.com' &&
                        <div>
                            <input className="btn btn-warning" type="submit" onClick={() => this.props.onEdit(props.index)} value="Edit" style={{ width: "80px" }} />
                            <span> </span>
                            <input className="btn btn-danger" type="submit" onClick={() => this.props.onDelete(props.index)} value="Delete" style={{ width: "80px" }} />
                        </div>
                    )
                },
                sortable: false,
                filterable: false
            }
        ]

        return (
            <div>
                <br />

                {/* <!-- Binding React Table --> */}
                <ReactTable
                    columns={columns}
                    data={this.state.list}
                    defaultPageSize={5}
                ></ReactTable>

                {/* <!-- Simple Table --> */}
                <div className="container">
                    {/* <table className="table">
                        <thead >
                            <tr>
                                <th></th>
                                <th>Employee Name</th>
                                <th>Employee Address</th>
                                <th>Employee Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                       
                        {this.props.arrayList.list.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        {item.employeeId > 0 &&
                                            <img src={Icon} style={{ "width": "40px", "height": "40px" }} alt="pic" />}
                                    </td>
                                    <td >{item.employeeName}</td>
                                    <td >{item.employeeAddress}</td>
                                    <td >{item.employeeSalary}</td>
                                    <td >
                                        <input className="btn btn-warning" type="submit" onClick={() => this.props.onUpdate(index)} value="Edit" style={{ width: "80px" }} />
                                        <span> </span>
                                        <input className="btn btn-danger" type="submit" onClick={() => this.props.onDelete(index)} value="Delete" style={{ width: "80px" }} />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table> */}
                </div>
            </div>
        )
    }
}
