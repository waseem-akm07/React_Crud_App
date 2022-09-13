import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import { BASE_URL, GET_DEPARTMENT } from '../../constants/Constants'


class FindDepartment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            department: [],
            token: '',
            departmentid: []
        }
    }

    /**
     * set state before render function
     * @param {* to store token in state} state 
     */
    static getDerivedStateFromProps(props, state) {
        return state.token = JSON.parse(localStorage.getItem('token'));
    }


    componentDidMount() {
        if (this.state.token !== null) {
            this.fetchDepartment();
        }        
    }


    /**
     * To fetch all department
     */
    fetchDepartment = () => {
        axios({
            url: BASE_URL + GET_DEPARTMENT,
            method: 'GET',
            headers: { Authorization: `bearer ${this.state.token.access_token}` }
        }).then(res => {
            this.setState({ department: res.data })
        }).catch(function (error) {
            console.log(error)
        });
    }


    /**
     * To Handle selected value of Dropdown
     */
    onDepartmentHandle = (event) => {
        this.props.SelectedValue(event.opt)
    }



    render() {

        //dropdown list options
        let options =
            this.state.department.map(opt => (
                { label: opt.DepartmentName, value: opt.DepartmentId }
            ))

        //Clear All option in dropdown 
        const CustomClearText = () => "clear all";
        const ClearIndicator = props => {
            const {
                children = <CustomClearText />,
                getStyles,
                innerProps: { ref, ...restInnerProps }
            } = props;
            return (
                <div
                    {...restInnerProps}
                    ref={ref}
                    style={getStyles("clearIndicator", props)}
                >
                    <div style={{ padding: "0px 5px" }}>{children}</div>
                </div>
            );
        };

        return (
            <div>
                <label className="btn"><b>Find Employees by Department :</b></label><span> </span>
                {this.state.department && this.state.department.length > 0 &&
                    <Select
                        placeholder='Select Departments...'
                        isMulti
                        options={options}
                        onChange={(opt) => this.onDepartmentHandle({ opt })}
                        className="basic-multi-select"
                        isSearchable={true}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        // isLoading={true}
                        backspaceRemovesValue={true}
                        menuPlacement="auto"
                        components={{ ClearIndicator }}
                    />
                }
            </div>
        )
    }
}
export default FindDepartment;