import React, { Component } from 'react';
import toastr from 'toastr';
import {post} from 'axios';

export default class GalleryCrud extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'Stuff',
        description: 'description'
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      let formData = new FormData();
      formData.append(name, value);

      post("/galleries", formData, config).then(response => {
        const done = response.data;
        if(done){
          toastr.success('The gallery was added!');
        } else {
          toastr.warning('The gallery failed to update.');
        }
      });

      toastr.info('The name is: ' + name + '. The value is: ' + value);
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }