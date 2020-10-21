import React, { Fragment } from "react"
import { Image } from "cloudinary-react";
import {connect} from "react-redux"
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/scss/image-gallery.scss";
import { fetchPhotos, openUploadWidget } from "../../utils/cloudinary";
import {uploadPhoto, getAllImages} from "../../actions"
import "./styles.scss"

class Gallery extends React.Component {
  state = {
    imageTitle: "",
    image: "",
    imageDescription: "",
    imagesPending: [],
  }

  componentDidMount(){
    this.props.getAllImages()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.images !== this.props.images) {
      this.setState({images: this.props.images})
    }
  }

  handlePublishImage = () => {
    return this.state.imagesPending.length > 0 && this.state.imagesPending.map(image => {
      const formData = {
        title: this.state.imageTitle,
        description: this.state.imageDescription,
        src: image
      }
      return this.props.uploadPhoto(formData)
    })
  }


  handlePhotoUpload = (tag) => {
    const uploadOptions = {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      tags: ["collo"],
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    }
    let imagesPending =[]
    openUploadWidget(uploadOptions, (error, photos) => {
      if(!error) {
        if(photos.event === "success") {
          imagesPending.push(photos.info.secure_url && photos.info.secure_url)
          console.log(photos.info.secure_url && photos.info.secure_url)
          this.setState({image: photos.info.secure_url && photos.info.secure_url})
          this.setState({imagesPending})
          this.setState({uploadMode: !this.state.uploadMode})
        }
      }else{
        console.log(error)
      }
    })
  }

  renderGallery = () => {
    const {images} = this.state
    let galleryList = []
    images && images.map((image) => {
      return galleryList.push({original: image.src, thumbnail: image.src})
    })
    return (
      <div className="ui container photoContainer">
        <ImageGallery items={galleryList} Sizes={"100px 200px"}/>
      </div>
    )
  }

  render(){
    return(
      <Fragment> 
        <div className="content">
          <h1 className="title">Farewell Collins Ng'ang'a</h1>
          <div className="buttonContainer">
            <button 
              className="ui labeled icon button btn"
                onClick={this.handlePhotoUpload}>
                <i class="upload icon"></i>
                Upload  memory
            </button>
            <div class="ui labeled button" tabindex="0"
              onClick={this.handlePublishImage}
              >
              <div class="ui green button">
                <i class="save icon"></i> Save memory
              </div>
                <a className="ui basic green left pointing label">
                {this.state.images && this.state.images.length}
              </a>
            </div>
            {/* <button 
              className="ui labeled icon button"
              onClick={this.handlePublishImage}>
              Save a Memory
            </button> */}
          </div>
          {this.renderGallery()}       
        </div> 
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    images: Object.values(state.images)
  }
}

export default connect(
  mapStateToProps,
  { 
    getAllImages,
    uploadPhoto
  }
)(Gallery)