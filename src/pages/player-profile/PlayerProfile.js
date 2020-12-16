import React, { Component } from 'react';
import { withAuth } from './../../context/auth-context';
import axios from 'axios';
import apiService from './../../lib/api-service';

// Import Assets
import avatar from './../../assets/avatar.png';

import ArcadeCard from './../../components/arcade-cards/ArcadeCard';

class PlayerProfile extends Component {
    state = {
        avatarImg: "",
        isEditing: false,
        arcade: []
    }

    componentDidMount() {
       
        apiService.me()
        .then((me) => {
            const myArcadesArr = me.listedArcades;
            console.log(myArcadesArr);
            this.setState({avatarImg: me.avatarImg, arcade: myArcadesArr})
        })
        .catch((err) => console.log(err));
    

    }

    editMyProfile = () => {
        this.setState({isEditing: true})
    }

    cancelEditProfile = () => {
        this.setState({isEditing: false})
    }

    eraseListedArcade = (id) => {
        console.log(id);
        apiService.deleteArcade(id)
            .then(() => {
                const myArcadesArr = this.state.arcade.filter((data) => data._id !== id)


                this.setState({arcade: myArcadesArr})

                apiService.me()
                .then((me) => {
                    const myArcadesArr = this.props.user.listedArcades;
                    this.setState({arcade: myArcadesArr})
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }

    handleFileUpload = (e) => {
        console.log("The file to be uploaded is: ", e.target.files);
        const file = e.target.files[0];
    
        const uploadData = new FormData();
        // image => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new project in '/api/projects' POST route
        uploadData.append("avatarImg", file);
    
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/player/upload`, uploadData, {
            withCredentials: true,
          })
          .then((response) => {
            console.log("response is: ", response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state
            this.setState({ avatarImg: response.data.secure_url });
          })
          .catch((err) => {
            console.log("Error while uploading the file: ", err);
          });
    }

    handleAvatarChange = (event) => {
        event.preventDefault();

        const avatarImg = this.state.avatarImg;

        apiService.updateMe({avatarImg})
        .then((me) => {
            this.setState({avatarImg: me.avatarImg})
        })
        .catch((err) => console.log(err));
    }

    render() {

        return (
            <div style={{padding: 30}}>
                {!this.state.isEditing
                ?
                <>
                    <button style={{borderRadius: 6}} onClick={this.editMyProfile} > Edit </button>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100vh"}}>
                        <h2 style={{marginBottom: 50}}> PROFILE </h2>
                        { !this.props.user.avatarImg
                        ? <img src={avatar} alt="" style={{height: 80, width: "auto", marginBottom: 41, borderRadius: "50%"}} />
                        : <img src={this.state.avatarImg} alt="" style={{height: 80, width: "auto", marginBottom: 62, borderRadius: "50%"}} />
                        }
                        <div>
                            <h3 style={{textAlign: "center"}}>LISTED ARCADES</h3>
                            {this.state.arcade.length > 0 
                            ? this.state.arcade.map((element) => {
                                return <ArcadeCard key={element._id} arcade={element} style={{marginBottom: 40}} currentUser={this.props.user} eraseListedArcade={this.eraseListedArcade} showArcadeDetails={this.showArcadeDetails} />}
                            )
                            : <p>No Arcades Listed</p>
                            }
                        </div>
                    </div>
                </>
                : 
                <>
                    <button style={{borderRadius: 6}} onClick={this.cancelEditProfile} > Cancel Edit </button>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", height: "100vh"}}>
                        <h2 style={{marginBottom: 50}}>PROFILE</h2>
                        { !this.props.user.avatarImg
                        ? <img src={avatar} alt="" style={{height: 80, width: "auto", marginBottom: 41, borderRadius: "50%"}} />
                        : <img src={this.state.avatarImg} alt="" style={{height: 80, width: "auto", marginBottom: 41, borderRadius: "50%"}} />
                        }

                        <form className="editProfilePic" onSubmit={this.handleAvatarChange}>
                        <input type="file" name="avatarImg" onChange={this.handleFileUpload} />
                            <button type="submit"> 
                                Save Profile Image 
                            </button>
                        </form>
                        <div>
                            <h3 style={{textAlign: "center"}}>MODIFY LISTED ARCADES</h3>
                            {this.state.arcade.length > 0 
                            ? this.state.arcade.map((element) => {
                                return <ArcadeCard key={element._id} arcade={element} style={{marginBottom: 40}} isEditing={this.state.isEditing} currentUser={this.props.user} eraseListedArcade={this.eraseListedArcade} showArcadeDetails={this.showArcadeDetails} />}
                            )
                            : <p>No Arcades Listed</p>
                            }
                        </div>
                    </div>
                </>
                }
            </div>
        )
    }
}

export default withAuth(PlayerProfile);
