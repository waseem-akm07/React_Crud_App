import React from 'react';
import axios from 'axios';

import { BASE_URL, GET_DEPARTMENT } from '../../constants/Constants';


class Department extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            department: '',
            token: '',
            departmentId: null,
            departmentName: null
        }
    }


    /**
     * set state before rendering functions
     * @param {* to store token in state} state 
     */
    static getDerivedStateFromProps(props, state) {
        return state.token = JSON.parse(localStorage.getItem('token'))
    }


    componentDidMount() {
        if (this.state.token !== null) {
            this.onfetchDepartments();
        } 
    }


    /**
     * To fetch all department
     */
    onfetchDepartments = () => {
        axios({
            url: BASE_URL + GET_DEPARTMENT,
            method: 'GET',
            headers: { Authorization: `bearer ${this.state.token.access_token}` }
        }).then(res => {
            this.setState({ department: res.data })
        }).catch(function (error) {
            console.log(error);
        })
    }


    /**
     * To handle dropdown selected value
     */
    onDropDownHandle = (e) => {
        if (e.target.value !== 'All') {
            let departmentData = this.state.department.find((item, DeparmentName) => item.DepartmentId === e.target.selectedIndex)
            this.props.onGetSelectedId(departmentData)
        }
    }

    render() {
        return (
            <div>
                <label className=""> Department :</label><span> </span>
                {this.state.department && this.state.department.length > 0 &&

                    <select className="btn btn-default" style={{ "width": "12%" }} onChange={this.onDropDownHandle}>
                        <option value='All' >Select Department</option>
                        {this.state.department.map((item, i) => {
                            return (
                                <option key={i} value={item.DepartmentId} >{item.DepartmentName}</option>
                            )
                        })}
                    </select>
                }
            </div>
        )
    }
}
export default Department