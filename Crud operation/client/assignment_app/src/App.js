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
    searchText: '',
    list: [],
    isLoading: true,
    filteredList:[]
  };

  render() {
    const { list, searchText, isLoading, filteredList } = this.state;
    return (<div>
      <input type='text' value={searchText} onChange={(e) => this.setState({ searchText: e.target.value })} />
      <Table
        columns={TABLE_COLUMNS}
        data={filteredList}
        isLoading={isLoading}
      />
    </div>

    )

  };
  componentDidMount() {
    fetch('http://localhost:3010/assignments/').then(res => res.json()).then(({ results }) => {
      // console.log(results);
      // this.setState({list:data.results})
      console.log('data from api', results);
      setTimeout(() => {
        this.setState({ list: results, isLoading: false, filteredList:results });  
      }, 3000);
      
    });
  };
 componentDidUpdate(prevProps, prevState){
if(prevState.searchText!== this.state.searchText){
    this.setState({filteredList:this.state.list.filter((li) => {
      return li.subName.toLowerCase().startsWith(this.state.searchText.toLowerCase());
    })
  }); 
}

  };
}

export default App;
