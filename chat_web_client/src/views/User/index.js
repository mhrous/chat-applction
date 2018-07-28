import React from "react";
import Avatar from "material-ui/Avatar";
import ListItem from "material-ui/List/ListItem";
import "./stayle.css";

const User = ({ name, color, status, disabled, id, notification }) => {
  return (
    <div id="user" key={{ id }}>
      <ListItem
        leftAvatar={
          <Avatar color={"#ffffff"} backgroundColor={color} size={40}>
            {name[0].toUpperCase()}
          </Avatar>
        }
        disabled={disabled}
        hoverColor="rgba(0,0,0,0.05)"
      >
        {name}
        {status && <div className={`status ${status}`} />}
        {notification !== undefined &&
          notification !== 0 && (
            <div className="notification">{notification}</div>
          )}
      </ListItem>
    </div>
  );
};

export default User;
