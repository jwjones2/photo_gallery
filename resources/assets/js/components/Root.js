import {Route} from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import Navbar from "./Navbar";
import Gallery from "./Gallery";
import Uploader from "./Uploader";
import GalleryCrud from "./GalleryCrud";
import ManageGallery from "./ManageGallery";
import GalleryManager from './GalleryManager';


export default class Root extends Component {
    render() {
        return (
            <Fragment>
                <Route path="/" render={(props) => (
                    <Navbar {...props}/>
                )}/>

                <div className="container">
                    <Route exact path="/" component={GalleryManager}/>
                    <Route exact path="/gallery" component={Gallery}/>
                    <Route exact path="/manage" component={ManageGallery}/>
                    <Route exact path="/upload" component={Uploader}/>
                    <Route exact path="/gallerycrud" component={GalleryCrud}/>
                </div>
            </Fragment>
        );
    }
}