import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import politico1 from "./Images/Politicos/politico1.jpg";
import politico2 from "./Images/Politicos/politico2.jpg";
import politico3 from "./Images/Politicos/politico3.jpg";
import politico4 from "./Images/Politicos/politico4.jpg";
import politico5 from "./Images/Politicos/politico5.jpg";
import politico6 from "./Images/Politicos/politico6.png";
import politico7 from "./Images/Politicos/politico7.png";
import politico8 from "./Images/Politicos/politico8.png";
import politico9 from "./Images/Politicos/politico9.jpg";
import politico10 from "./Images/Politicos/politico10.webp";
import politico11 from "./Images/Politicos/politico11.jpg";
import politico12 from "./Images/Politicos/politico12.jpg";
import politico13 from "./Images/Politicos/politico13.webp";
import politico14 from "./Images/Politicos/politico14.jpg";
import politico15 from "./Images/Politicos/politico15.jpg";

import politico16 from "./Images/Politicos/politico16.jpg";
import politico17 from "./Images/Politicos/politico17.jpg";
import politico18 from "./Images/Politicos/politico18.avif";

import politico20 from "./Images/Politicos/politico20.jpg";
import politico21 from "./Images/Politicos/politico21.jpg";

import politico23 from "./Images/Politicos/politico23.jpg";
import politico24 from "./Images/Politicos/politico24.jpg";
import politico25 from "./Images/Politicos/politico25.jpg";


import audioHimno from "./Sounds/Himno_URSS.mp3";
import audioGta from "./Sounds/GTA_Mision.mp3";
import audioCabra from "./Sounds/Cabra_Gritando.mp3";
import audioNuclear from "./Sounds/Alerta_Nuclear.mp3";

import audioPedro from "./Sounds/Pedro_Piqueras.mp3";
import audioTit from "./Sounds/Titanic_flute.mp3";
import audioMatar from "./Sounds/Me_Matar.mp3";

import audioGadget from "./Sounds/Inspector_Gadget.mp3";

import audioExpediente from "./Sounds/Expediente_X.mp3";
import audioMartin from "./Sounds/Martín_Matin.mp3";
import audioPers from "./Sounds/persecución.mp3";
import audio50Cent from "./Sounds/50-Cent-In-Da-Club.mp3";
import rajoy_audio from "./Sounds/rajoy_meme.mp3";
import audioAtencione from "./Sounds/Attenzione.mp3";
import audioGato from "./Sounds/GatoHuh.mp3";
import audioPum from "./Sounds/PUM-Audio.mp3";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <div className="divCrear">
          <button className="btnToggleTheme" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sonidos" element={<Sonidos />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const [newUser, setNewUser] = useState({
    name: "",
    points: 0,
    señor: false,
  });
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const sprintsCollectionRef = collection(db, "sprints"); // Nueva colección para guardar los datos del sprint
  const [password, setPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const imagesData = [
    politico1,
    politico2,
    politico3,
    politico4,
    politico5,
    politico6,
    politico7,
    politico8,
    politico9,
    politico10,
    politico11,
    politico12,
    politico13,
    politico14,
    politico15,
    politico16,
    politico17,
    politico18,

    politico20,
    politico21,

    politico23,
    politico24,
    politico25,
  ];

  const createUser = async () => {
    const randomIndex = Math.floor(Math.random() * imagesData.length);
    const randomImage = imagesData[randomIndex];

    await addDoc(usersCollectionRef, {
      name: newUser.name,
      points: Number(newUser.points),
      señor: newUser.señor,
      image: randomImage,
    });

    setNewUser({
      name: "",
      points: 0,
      señor: false,
    });
  };

  const updateUser = async (id, points) => {
    const pointsToAdd = parseInt(prompt(`¿Cuántos puntos desea añadir?`)) || 0;

    const userDoc = doc(db, "users", id);
    const newFields = { points: points + pointsToAdd };
    await updateDoc(userDoc, newFields);
  };

  const deletePointsUser = async (id, points) => {
    const pointsToAdd =
      parseInt(prompt(`¿Cuántos puntos desea eliminar?`)) || 0;

    const userDoc = doc(db, "users", id);
    const newFields = { points: points - pointsToAdd };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const closeSprint = async () => {
    const enteredPassword = prompt("Enter password for closing sprint:");
    if (enteredPassword === "Salle23@") {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

      const month = monthNames[currentMonth];
      const year = currentYear;

      // Guardar datos del sprint por mes, año y nombre de usuario
      users.forEach(async (user) => {
        const sprintDocRef = doc(sprintsCollectionRef, `${user.name}-${month}-${year}`);
        await setDoc(sprintDocRef, { points: user.points });
      });

      // Mostrar mensaje de éxito
      alert("Sprint closed successfully. Data saved.");
    } else {
      // Mostrar mensaje de contraseña incorrecta
      setIncorrectPassword(true);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const allUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Separar usuarios señores y juniors
      const señores = allUsers.filter((user) => user.señor);
      const juniors = allUsers.filter((user) => !user.señor);

      // Ordenar usuarios por puntos
      señores.sort((a, b) => b.points - a.points);
      juniors.sort((a, b) => b.points - a.points);

      // Establecer usuarios ordenados
      setUsers([...señores, ...juniors]);
    };

    getUsers();

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const allUsers = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Separar usuarios señores y juniors
      const señores = allUsers.filter((user) => user.señor);
      const juniors = allUsers.filter((user) => !user.señor);

      // Ordenar usuarios por puntos
      señores.sort((a, b) => b.points - a.points);
      juniors.sort((a, b) => b.points - a.points);

      // Establecer usuarios ordenados
      setUsers([...señores, ...juniors]);
    });

    return unsubscribe;
  }, []);


  const señores = users.filter((user) => user.señor);
  const juniors = users.filter((user) => !user.señor);

  // Calcular la suma de puntos para cada equipo
  const totalPointsSeñores = señores.reduce(
    (acc, curr) => acc + curr.points,
    0
  );
  const totalPointsJuniors = juniors.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  return (
    <div>
      <div className="divCrear">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(event) => {
            setNewUser({ ...newUser, name: event.target.value });
          }}
        />
        <input
          type="number"
          placeholder="Points"
          value={newUser.points}
          onChange={(event) => {
            setNewUser({ ...newUser, points: event.target.value });
          }}
        />
        <label className="checkbox-label">
        Aristócrate:
          <input
            type="checkbox"
            checked={newUser.señor}
            onChange={(event) => {
              setNewUser({ ...newUser, señor: event.target.checked });
            }}
            className="styled-checkbox"
          />
        </label>

        <button className="btnCreate" onClick={createUser}>
          Create User
        </button>
        <button className="btnCreate" onClick={closeSprint}>
          Close Sprint
        </button>
        <Link to="/sonidos">
          <button className="btnSonidos">Sonidos</button>
        </Link>
        <Link to="/cards">
          <button className="btnSonidos">Cards</button>
        </Link>
      </div>

      <div className="container">
        <div className="column">
          <h1>Aristócrates </h1>
          <h2>(Total points: {totalPointsSeñores})</h2>
          {señores.map((user) => (
            <div className="userMember" key={user.id}>
              <div className="divMember">
                <div className="member">
                  <img src={user.image} alt={`${user.image}`} />
                </div>
                <div>
                  <h2>{user.name}</h2>
                  <h2>Points: {user.points}</h2>
                </div>
              </div>
              <button
                onClick={() => {
                  updateUser(user.id, user.points);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  deletePointsUser(user.id, user.points);
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                 {user.name}
              </button>
            </div>
          ))}
        </div>
        <div className="column">
          <h1>Eres una máquina, ¿no? </h1>
          <h2>(Total points: {totalPointsJuniors})</h2>
          {juniors.map((user) => (
            <div key={user.id}>
              <div className="divMember">
                <div className="member">
                  <img src={user.image} alt={`${user.image}`} />
                </div>
                <div>
                  <h2>{user.name}</h2>
                  <h2>Points: {user.points}</h2>
                </div>
              </div>
              <button
                onClick={() => {
                  updateUser(user.id, user.points);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  deletePointsUser(user.id, user.points);
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                 {user.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sonidos() {
  const playSound = (audioId) => {
    const audioElement = document.getElementById(audioId);
    audioElement.play();
  };

  const pauseSound = (audioId) => {
    const audioElement = document.getElementById(audioId);
    audioElement.pause();
  };

  return (
    <div>
      <div className="divCrear">
        <Link to="/">
          <button className="btnSonidos">Sprint</button>
        </Link>
      </div>
      <div className="container">
        <div className="container_cards">
          <div className="card">
            <img
              src="https://img.freepik.com/vector-premium/icono-peligro-radiacion-alerta-amenaza-radiactiva-simbolo-precaucion-nuclear_342166-429.jpg?w=2000"
              onClick={() => playSound("Nuclear_audio")}
              alt="Play Sound"
            />
            <audio id="Nuclear_audio" src={audioNuclear}></audio>
            <p>Alerta Nuclear</p>
            <button onClick={() => pauseSound("Nuclear_audio")}>Stop</button>
          </div>
          <div class="card">
            <img
              src="https://animapedia.org/wp-content/uploads/2019/07/cabra-1.jpg"
              onClick={() => playSound("cabra_audio")}
              alt="Play Sound"
            />
            <audio id="cabra_audio" src={audioCabra}></audio>
            <p>Grito Cabra</p>
            <button onClick={() => pauseSound("cabra_audio")}>Stop</button>
          </div>
          <div class="card">
            <img
              src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg"
              onClick={() => playSound("gta_audio")}
              alt="Play Sound"
            />
            <audio id="gta_audio" src={audioGta}></audio>
            <p>GTA Mision Complete</p>
            <button onClick={() => pauseSound("gta_audio")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://okdiario.com/img/2022/02/24/-que-paises-formaron-parte-de-la-urss_.jpg"
              onClick={() => playSound("himnoUrss")}
              alt="Play Sound"
            />
            <audio id="himnoUrss" src={audioHimno}></audio>
            <p>URSS</p>
            <button onClick={() => pauseSound("himnoUrss")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://i.ytimg.com/vi/Gotz1iO_w4E/maxresdefault.jpg"
              onClick={() => playSound("matar")}
              alt="Play Sound"
            />
            <audio id="matar" src={audioMatar}></audio>
            <p>Me voy a matar</p>
            <button onClick={() => pauseSound("matar")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://images.ecestaticos.com/c4hpdnLzRo8r-38mIYxZNVdheGk=/0x0:1481x843/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fa2a%2F41c%2Ff55%2Fa2a41cf555c504efd8b2be886bcf93ee.jpg"
              onClick={() => playSound("piqueras")}
              alt="Play Sound"
            />
            <audio id="piqueras" src={audioPedro}></audio>
            <p>Pedro Piqueras</p>
            <button onClick={() => pauseSound("piqueras")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic762774.jpg?w=1600&h=900"
              onClick={() => playSound("titanic")}
              alt="Play Sound"
            />
            <audio id="titanic" src={audioTit}></audio>
            <p>Titanic</p>
            <button onClick={() => pauseSound("titanic")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://i1.wp.com/clipset.com/wp-content/uploads/2013/10/gadget.jpg?ssl=1"
              onClick={() => playSound("ins_gad")}
              alt="Play Sound"
            />
            <audio id="ins_gad" src={audioGadget}></audio>
            <p>Inspector Gadget</p>
            <button onClick={() => pauseSound("ins_gad")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://pics.filmaffinity.com/Expediente_X_Serie_de_TV-450691206-large.jpg"
              onClick={() => playSound("exp_x")}
              alt="Play Sound"
            />
            <audio id="exp_x" src={audioExpediente}></audio>
            <p>Expediente X</p>
            <button onClick={() => pauseSound("exp_x")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8ecPdGItJrQOe-ThKpLkDAGG0E87dRs6ew&s"
              onClick={() => playSound("50_cent")}
              alt="Play Sound"
            />
            <audio id="50_cent" src={audio50Cent}></audio>
            <p>50 Cent</p>
            <button onClick={() => pauseSound("50_cent")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2017/06/15/14975454677947.jpg"
              onClick={() => playSound("rajoy")}
              alt="Play Sound"
            />
            <audio id="rajoy" src={rajoy_audio}></audio>
            <p>Rajoy</p>
            <button onClick={() => pauseSound("rajoy")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://i1.sndcdn.com/artworks-9FEfDz0gEWzbIcgc-ZfrGnQ-t500x500.jpg"
              onClick={() => playSound("atencione")}
              alt="Play Sound"
            />
            <audio id="atencione" src={audioAtencione}></audio>
            <p>Atencione!</p>
            <button onClick={() => pauseSound("atencione")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://www.formulatv.com/images/videos/19000/19526_658697fc59-t.jpg"
              onClick={() => playSound("pum")}
              alt="Play Sound"
            />
            <audio id="pum" src={audioPum}></audio>
            <p>PUM!!!</p>
            <button onClick={() => pauseSound("pum")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://memeviral.com.mx/wp-content/uploads/2023/12/plantilla.png"
              onClick={() => playSound("gato")}
              alt="Play Sound"
            />
            <audio id="gato" src={audioGato}></audio>
            <p>Gato Huh</p>
            <button onClick={() => pauseSound("gato")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="http://1.bp.blogspot.com/-b4doarIZ2xM/U1PEG-G2bNI/AAAAAAAA4Vk/ey4TH2aj1Sg/s1600/martin10.jpg"
              onClick={() => playSound("martin_martin")}
              alt="Play Sound"
            />
            <audio id="martin_martin" src={audioMartin}></audio>
            <p>Martin Martin</p>
            <button onClick={() => pauseSound("martin_martin")}>Stop</button>
          </div>
          <div class="card">
            <img
              class="img_card"
              src="https://www3.gobiernodecanarias.org/medusa/proyectos/proyectonewton/wp-content/uploads/sites/20/2018/12/males-2512006_640.jpg"
              onClick={() => playSound("persecucion")}
              alt="Play Sound"
            />
            <audio id="persecucion" src={audioPers}></audio>
            <p>Persecucion</p>
            <button onClick={() => pauseSound("persecucion")}>Stop</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function Cards() {
  const cardsData = [
    { color: "#FFDDC1", text: "I'm a funny card!", author: "by Alex" },
    { color: "#E1F7D5", text: "Why did the chicken...", author: "BY SANDRA" },
    { color: "#C9E4FF", text: "Keep smiling!", author: "by Charlie" },
    { color: "#FFE4E1", text: "I am hilarious!", author: "BY MICHAEL" },
    { color: "#FFF9C4", text: "Don't worry, be happy!", author: "by Emma" },
  ];

  return (
    <div className="container_cards">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="card cardHover"
          style={{ backgroundColor: card.color }}
        >
          <p>{card.text}</p>
          <div className="cardAuthor">{card.author}</div>
        </div>
      ))}
    </div>
  );
}
export default App;
