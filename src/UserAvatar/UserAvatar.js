import React from 'react';
import Avatar from 'antd/es/avatar';

const AccountAvatar = ({ avatar, username, size, shape }) => {

  if(avatar === null || avatar === undefined || avatar.trim() === '')
    return(
    <Avatar
      alt={`Avatar for ：${username}`}
      shape={shape === undefined ? 'circle': shape}
      size={size}
      className="Avatar"
      role="img"
     >
      {username[0]}
    </Avatar>
    );

  const userAvatar = '/static/avatars/'+ avatar;

  return(
  <Avatar
    alt={`Avatar for ：${username}`}
    shape={shape === undefined ? 'circle': shape}
    type="circle"
    size={size}
    className="Avatar"
    src={userAvatar}
  />
  );

}

export default AccountAvatar;
