import React, { Component } from 'react';
import toastr from 'toastr';
import {get, post} from 'axios';

export default class GalleryCrud extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0,
        name: '',
        description: '',
        nameClass: 'bg-light',
        descriptionClass: 'bg-light'
      };

      // check for input id from url params
      if ( this.props.match.params.id ) {
        this.state.id = this.props.match.params.id;
      }
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount () {
      // if there is an id set, then go get the event data
      if ( this.state.id != 0 ) {
        get('/event', {
          params: {
              id: this.state.id
          }
        })
        .then(response => {
            const event = response.data;
            this.setState({
                name: event.name,
                description: event.description
            })
        })
      }
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      // update the state
      this.setState({
        [name]: value
      });

      // do the update if id is set in state, if not return since that must be handled by submit
      if ( this.state.id ) {
        post("/event", {
          id: this.state.id,
          name: this.state.name,
          description: this.state.description
        }).then(response => {
          const done = response.data;
          if(done){
            toastr.success('The event was updated!');
          } else {
            toastr.danger('The event failed to update.');
          }
        });
      }
    }

    submitForm (event) {
      /** 
       * The values are already updated in state because of the 
       * handleInputChange function.  Just need to post to create
       * the new event.
       * 
       * Need to validate first though.
      **/

      if ( this.state.name == '' ) {
        this.setState({
          nameClass: 'border border-danger'
        });
        toastr.warning('Event name cannot be blank.');

        return;
      }

      if ( this.state.description == '' ) {
        this.setState({
          descriptionClass: 'border border-danger'
        });
        toastr.warning('Event description cannot be blank.');

        return;
      }

      post('/new_event', {
        name: this.state.name,
        description: this.state.description
      }).then(response => {
        const done = response.data;
        if (done) {
          toastr.success('The event was added!');
          // set the id of the created event in the page
          this.state.id = done.id;
          alert(done.id);
        } else {
          toastr.danger('Could not add the event!  Please refresh the page and try again.');
        }
      });
    }
  
    render() {
      return (
        <form>
          <div className="form-group">
            <label htmlFor="eventName">
              Name:
            </label>
            <input
              name="name"
              id="eventName"
              className={"form-control " + this.state.nameClass}
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="eventDescription">
              Description:
            </label>
            <textarea
              id="eventDescription"
              name="description"
              className={"form-control " + this.state.descriptionClass}
              value={this.state.description}
              onChange={this.handleInputChange} />
          </div>

          <input 
            type="button" 
            className="btn btn-primary"
            onClick={this.submitForm} 
            value="Submit" />
        </form>
      );
    }
  }