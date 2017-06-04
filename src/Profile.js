/**
 * Created by Kishan Khakhar on 04/06/17.
 */
import React from 'react';

const Profile = function(props) {
  return (
    <div className="user-profile">
      <div className="user-profile__name">{props.name}</div>
      <div className="user-profile__name">{props.image}</div>
      <div className="user-profile__name">{props.email}</div>
    </div>
  );
};

export default Profile;
