import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { values } from 'lodash';
import HeaderContainer from './../home/header_container';
import FooterContainer from './../home/footer_container';
import Masonry from 'react-masonry-component';
import UserProfileEditContainer from'./user_profile_edit_container';
import BoardCreateFormContainer from './../boards/board_create_form_container';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.ownProfile = this.ownProfile.bind(this);
  }

  componentDidMount() {
    this.props.requestUser(this.props.username);
  }

  componentDidUpdate() {
    if (this.props.user === undefined) {
      this.props.requestUser(this.props.username);
    }
  }

  handleOpenEdit(e) {
    e.preventDefault();
    this.props.open(<UserProfileEditContainer username={this.props.username} />);
  }

  handleFollow(e) {
    e.preventDefault();
    this.props.follow(this.props.user.id);
    $(".profile-follow-button").hide();
    $(".profile-unfollow-button").show();
    this.props.requestUser(this.props.currentUser.username);
  }

  handleUnfollow(e) {
    e.preventDefault();
    this.props.unfollow(this.props.user.id);
    $(".profile-unfollow-button").hide();
    $(".profile-follow-button").show();
    this.props.requestUser(this.props.currentUser.username);
  }

  ownProfile() {
    if (this.props.currentUser.username === this.props.username) {
      return (
        <div className="profile-options">
          <div onClick={this.handleOpenEdit} className="profile-settings">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div></div>
        </div>
      );
    } else if (this.props.currentUser.followings && this.props.currentUser.followings[this.props.user.id]) {
      return (
        <div className="profile-options">
          <div></div>
          <div onClick={this.handleUnfollow} className="profile-unfollow-button">Unfollow</div>
          <div onClick={this.handleFollow} className="profile-follow-button" style={{display: 'none'}}>Follow</div>
        </div>
      );
    } else {
      return (
        <div className="profile-options">
          <div></div>
          <div onClick={this.handleUnfollow} className="profile-unfollow-button" style={{display: 'none'}}>Unfollow</div>
          <div onClick={this.handleFollow} className="profile-follow-button">Follow</div>
        </div>
      );
    }
  }

  boardsList() {
    const boards = (values(this.props.user.boards)).map( board => {
      return (
        <li className="board-list-item" key={board.id}>
          <div className="board-hover">
            <div className="board-list-item">
              <Link className="board-list-link" to={`/${this.props.username}/board/${board.id}`}>{board.name}</Link>
            </div>
          </div>
        </li>
      );
    });
    if (this.props.username === this.props.currentUser.username) {
      boards.unshift(
        <li className="board-add" key="add">
          <div onClick={ () => this.props.open(<BoardCreateFormContainer />) } className="board-hover board-add">
            <div className="board-list-item">
              <div className="board-add-icon">
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </li>
      );
    }
    return boards;
  }

  render() {

    if (this.props.user) {
      if (this.props.user.boards) {
        return(
          <div className="profile-show-container">
            <HeaderContainer />
            {this.ownProfile()}
            <h1 className="profile-show-username">{this.props.username}</h1>
            <div className="profile-info">
              <div className="profile-info-left">
                <div className="profile-description">{this.props.user.description}</div>
              </div>
              <div className="profile-info-right">
                <div className="profile-follow">
                  <span className="profile-follow-num">{this.props.user.num_followers}</span>
                  <br/>
                  <span className="profile-follow">Followers</span>
                </div>
                <div className="profile-follow">
                  <span className="profile-follow-num">{this.props.user.num_followings}</span>
                  <br/>
                  <span className="profile-follow">Following</span>
                </div>
                <div className="profile-pic">
                  <img className="profile-pic" src={this.props.user.image_url} />
                </div>
              </div>
            </div>
            <div className="profile-links">
              <Link className="profile-links-active" to={`/${this.props.username}/boards`}>Boards</Link>
              <Link className="profile-links" to={`/${this.props.username}/pins`}>Pins</Link>
            </div>
            <div className="boards-list">
              <ul className="boards-list">
                {this.boardsList()}
              </ul>
            </div>
            <FooterContainer />
          </div>
        );
      } else {
        return(
          <div className="profile-show-container">
            <HeaderContainer />
            {this.ownProfile()}
            <h1 className="profile-show-username">{this.props.username}</h1>
            <div className="profile-info">
              <div className="profile-info-left">
                <div className="profile-description">{this.props.user.description}</div>
              </div>
              <div className="profile-info-right">
                <div className="profile-follow">
                  <span className="profile-follow-num">0</span>
                  <br/>
                  <span className="profile-follow">Followers</span>
                </div>
                <div className="profile-follow">
                  <span className="profile-follow-num">0</span>
                  <br/>
                  <span className="profile-follow">Following</span>
                </div>
                <div className="profile-pic">
                  <img className="profile-pic" src={this.props.user.image_url} />
                </div>
              </div>
            </div>
            <div className="profile-links">
              <Link className="profile-links-active" to={`/${this.props.username}/boards`}>Boards</Link>
              <Link className="profile-links" to={`/${this.props.username}/pins`}>Pins</Link>
            </div>
            <div>
              <ul className="boards-list">
                {this.boardsList()}
              </ul>
            </div>
            <FooterContainer />
          </div>
        );
      }
    } else {
      return null;
    }
  }

}

export default withRouter(UserProfile);
