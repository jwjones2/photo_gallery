import React, { Component } from 'react';
import {get} from 'axios';
import ReactGallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export default class Gallery extends Component {
    constructor(props){
        super(props);

        // get the current selected gallery and name
        let selectedGallery = localStorage.getItem('galleryId');
        let selectedGalleryName = localStorage.getItem('galleryName');
        this.state = {
            images : [],
            currentImage: 0,
            lightboxIsOpen: false,
            galleryId: selectedGallery,
            galleryName: selectedGalleryName
        };
    }

    componentDidMount(){
        get('/photos', {
                params: {
                    id: this.state.galleryId
                }
            })
            .then(response => {
                const images = response.data;
                this.setState({
                    images : images
                })
            })
    }

    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    render() {
        let photos = this.state.images.map(image => {
            return {
                src : '/storage/' + image.uri,
                width : image.width,
                height : image.height,
                id :  image.id
            }
        });
        return (
            <div className="gallery">
                <h1>Gallery: {this.state.galleryName }</h1>

                {this.state.images.length ?
                    <ReactGallery
                        photos={photos}
                        onClick={this.openLightbox.bind(this)}
                    />
                    :
                    <div className="no-images">
                        <h5 className="text-center">
                            You currently have no images in your photos gallery
                        </h5>
                    </div>
                }

                <Lightbox images={photos}
                          onClose={this.closeLightbox.bind(this)}
                          onClickPrev={this.gotoPrevious.bind(this)}
                          onClickNext={this.gotoNext.bind(this)}
                          currentImage={this.state.currentImage}
                          isOpen={this.state.lightboxIsOpen}/>
            </div>

        );
    }
}