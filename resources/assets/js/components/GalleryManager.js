import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {get} from 'axios';

export default class GalleryManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            events : [],
        };

        this.openGallery = this.openGallery.bind(this)
    }

    componentDidMount(){
        get('/galleries')
            .then(response => {
                const events = response.data;
                this.setState({
                    events : events
                })
            })
    }

    openGallery ( e, id, name ) {
        localStorage.setItem('galleryId', id);
        localStorage.setItem('galleryName', name);
        this.props.history.push('/gallery');
    }

    createGallery(){
        alert('here');
    }

    render() {
        var divStyle = {
            backgroundColor: window.getRandomColor()
        }
        
        let that = this; // to be able to access class level this in return

        let galleryList = this.state.events.map(function (gallery) {
            // determine if image is set yet
            // ...
            return (
                <div className="card"
                    key={gallery.id}
                    style={divStyle}>
                        <img className="card-img"
                            src="..."
                            alt="Card Image" />
                        <div className="card-image-overlay">
                            <h4 className="card-title">
                                {gallery.name}
                            </h4>
                            <p className="card-text">
                                {gallery.description}
                            </p>

                            <button 
                                className="btn btn-primary"
                                id={gallery.id}
                                onClick={((e) => that.openGallery(e, gallery.id, gallery.name))} >
                                Open Gallery
                            </button>
                        </div>
                </div>
            );
        });

        return (
            <div className="gallery">
                <button onClick={this.createGallery.bind(this)}>Add a Gallery</button>

                <ul>
                    {galleryList}
                </ul>

            </div>
        );
    }
}