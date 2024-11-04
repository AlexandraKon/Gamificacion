import React from "react";
import "./User.css";

function User({ user, updateUser, deletePointsUser, deleteUser }) {
  return (
    <div className="userMember">
      <div className="divMember">
        <div className="member">
          <img src={user.image} alt={`${user.image}`} />
        </div>
        <div>
          <h2>{user.name}</h2>
          <h2>Points: {user.points}</h2>
        </div>
      </div>
      <button onClick={() => updateUser(user.id, user.points)}>+</button>
      <button onClick={() => deletePointsUser(user.id, user.points)}>-</button>
      <button onClick={() => deleteUser(user.id)}>{user.name}</button>
    </div>
  );
}

export default User;