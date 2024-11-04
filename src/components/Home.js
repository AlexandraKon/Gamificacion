import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import User from "../components/User";
import "./Home.css";

function Home() {
  const [newUser, setNewUser] = useState({ name: "", points: 0, señor: false });
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const sprintsCollectionRef = collection(db, "sprints");
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const allUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const señores = allUsers.filter((user) => user.señor);
      const juniors = allUsers.filter((user) => !user.señor);
      señores.sort((a, b) => b.points - a.points);
      juniors.sort((a, b) => b.points - a.points);
      setUsers([...señores, ...juniors]);
    };

    getUsers();

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const allUsers = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const señores = allUsers.filter((user) => user.señor);
      const juniors = allUsers.filter((user) => !user.señor);
      señores.sort((a, b) => b.points - a.points);
      juniors.sort((a, b) => b.points - a.points);
      setUsers([...señores, ...juniors]);
    });

    return unsubscribe;
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, newUser);
    setNewUser({ name: "", points: 0, señor: false });
  };

  const updateUser = async (id, points) => {
    const pointsToAdd = parseInt(prompt(`¿Cuántos puntos desea añadir?`)) || 0;
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { points: points + pointsToAdd });
  };

  const deletePointsUser = async (id, points) => {
    const pointsToAdd = parseInt(prompt(`¿Cuántos puntos desea eliminar?`)) || 0;
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { points: points - pointsToAdd });
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const closeSprint = async () => {
    const enteredPassword = prompt("Enter password for closing sprint:");
    if (enteredPassword === "Salle23@") {
      users.forEach(async (user) => {
        const currentDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        const sprintDocRef = doc(sprintsCollectionRef, `${user.name}-${month}-${year}`);
        await setDoc(sprintDocRef, { points: user.points });
      });
      alert("Sprint closed successfully. Data saved.");
    } else {
      setIncorrectPassword(true);
    }
  };

  return (
    <div>
      <div className="divCrear">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(event) => setNewUser({ ...newUser, name: event.target.value })}
        />
        <input
          type="number"
          placeholder="Points"
          value={newUser.points}
          onChange={(event) => setNewUser({ ...newUser, points: event.target.value })}
        />
        <label className="checkbox-label">
          Aristócrate:
          <input
            type="checkbox"
            checked={newUser.señor}
            onChange={(event) => setNewUser({ ...newUser, señor: event.target.checked })}
            className="styled-checkbox"
          />
        </label>
        <button className="btnCreate" onClick={createUser}>Create User</button>
        <button className="btnCreate" onClick={closeSprint}>Close Sprint</button>
        <Link to="/sonidos">
          <button className="btnSonidos">Sonidos</button>
        </Link>
        <Link to="/cards">
          <button className="btnSonidos">Cards</button>
        </Link>
      </div>

      <div className="container">
        <div className="column">
          <h1>Aristócrates</h1>
          <h2>(Total points: {users.filter((user) => user.señor).reduce((acc, curr) => acc + curr.points, 0)})</h2>
          {users.filter((user) => user.señor).map((user) => (
            <User key={user.id} user={user} updateUser={updateUser} deletePointsUser={deletePointsUser} deleteUser={deleteUser} />
          ))}
        </div>
        <div className="column">
          <h1>Eres una máquina, ¿no?</h1>
          <h2>(Total points: {users.filter((user) => !user.señor).reduce((acc, curr) => acc + curr.points, 0)})</h2>
          {users.filter((user) => !user.señor).map((user) => (
            <User key={user.id} user={user} updateUser={updateUser} deletePointsUser={deletePointsUser} deleteUser={deleteUser} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
