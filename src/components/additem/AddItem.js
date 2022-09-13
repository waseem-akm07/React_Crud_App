import React from 'react';


class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            itemIndex: null,
            name: '',
            address: '',
            salary: '',
            text: 'Add'
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


    onAddHandle = () => {

        var { text, itemIndex, name, address, salary, list } = this.state;

        //check itemIndex not null and >=0 on update click
        if (text === 'Update' && itemIndex != null && itemIndex > -1) {
            //fill data into list of state
            list[itemIndex].name = name;
            list[itemIndex].address = address;
            list[itemIndex].salary = salary;
            this.setState({ list: list, text: "Add", itemIndex: null, name: "", address: "", salary: "" });
        }
        //for Add new data
        else {

            if (this.state.name.length === 0 && this.state.address.length === 0 && this.state.salary.length === 0) {
                alert('Fields can not be empty')
            } else {

                var salaryRegex = /^[1-9][0-9](?!0$)[0-9][1-9]?\d+$/
                //  var nameRegex = /^[A-Za-z0-9 ]+$/;
                var nameRegex = /^[A-Za-z]+$/;

                if (this.state.name.length > 0 && this.state.address.length !== 0 && this.state.salary.length !== 0) {
                    if (nameRegex.test(this.state.name) === true && salaryRegex.test(this.state.salary) == true && nameRegex.test(this.state.address) === true) {
                        this.setState(state => {
                            //add new data into state
                            const list = [...state.list, { name: state.name, address: state.address, salary: state.salary }];
                            return {
                                list,
                                name: '',
                                address: '',
                                salary: ''
                            };
                        });
                    } else {
                        alert('Validation: 1.Special characters not allow in name                            2.Salary should be greater then 1000                                                       3.Num not allow in Address')
                    }
                }
            }

            if (this.state.name.length !== 0 && this.state.address.length === 0 && this.state.salary.length !== 0) {
                alert('Address can not be empty')
            }

            else if (this.state.name.length === 0 && this.state.address.length !== 0 && this.state.salary.length !== 0) {
                alert('Name can not be empty')
            }

            else if (this.state.name.length !== 0 && this.state.address.length !== 0 && this.state.salary.length === 0) {
                alert('Salary can not be empty')
            }
        }
    }


    onUpdateHandle = (itemIndex) => {
        //find itemIndex of seleted item
        const list = this.state.list.find((item, index) => index === itemIndex);
        //fill textboxes
        this.setState({
            itemIndex,  //store index in state
            name: list.name,
            address: list.address,
            salary: list.salary,
            text: 'Update'  //change button text for update
        });
    }


    onDeleteHandle = (e) => {

        //find and filter data
        this.setState(state => {
            const list = state.list.filter((item, index) => index !== e);
            return {
                list
            };
        });
    }


    render() {
      //  console.log(JSON.stringify(this.state.list))
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

                <input type="submit" onClick={this.onAddHandle} value={this.state.text} />
                <br /><br />

                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Employee Address</th>
                                <th>Employee Salary</th>
                                <th></th>
                            </tr>
                        </thead>
                        {this.state.list.map((item, index) => (
                            <tbody>
                                <tr>
                                    <td  >{item.name}</td>
                                    <td >{item.address}</td>
                                    <td >{item.salary}</td>
                                    <td >
                                        <input type="submit" onClick={() => this.onUpdateHandle(index)} value="Edit" />
                                        <span> </span>
                                        <input type="submit" onClick={() => this.onDeleteHandle(index)} value="Delete" />
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        )
    }
}
export default AddItem; 