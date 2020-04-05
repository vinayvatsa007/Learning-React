import React, { Component } from 'react';
import Table from './Table';
import logo from './logo.svg';
import './App.css';
import { string } from 'prop-types';
import { Tab } from '@material-ui/core';

const TABLE_COLUMNS = [
  { name: 'subName' },
  { name: 'assignmentGivenByTeacher' },
  { name: 'section' },
  { name: 'assignmentDetails' },
  { name: 'dueDate' }
];

class App extends Component {
  state = {
    searchText:'',
    list: []
  };

  render() {
    const { list, searchText } = this.state;
    

    console.log('from render list of assignments', list);
    const filteredList = list.filter((li)=>{
      return li.subName.toLowerCase().includes(searchText.toLowerCase());
    });
    return (<div>
      <input type = 'text' value ={searchText} onChange={(e)=> this.setState({searchText:e.target.value})} />
      <Table
        columns={TABLE_COLUMNS}
        data={filteredList}
      />
    </div>
    
    )

  };
  componentDidMount() {
    fetch('http://localhost:3010/assignment/list').then(res => res.json()).then(({ results }) => {
      // console.log(results);
      // this.setState({list:data.results})
      // console.log(results);
      this.setState({ list: results });
    });
  };
}
export default App;
