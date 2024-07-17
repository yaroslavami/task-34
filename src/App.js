import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

const FriendAPI = {
  friends: [
    { id: 1, name: "Оксана Шевченко", age: 16, hobby: "Малювання" },
    { id: 2, name: "Софія Манковська", age: 19, hobby: "Компютерні ігри" },
    { id: 3, name: "Хуан Мануель Ортіз", age: 17, hobby: "Спати" },
    { id: 4, name: "Влад Корольов", age: 15, hobby: "Кодування" },
    { id: 5, name: "Зоряна Здорик", age: 16, hobby: "Вивчати мови" },
  ],
  all: function() { return this.friends },
  get: function(id) {
    const isFriend = p => p.id === id;
    return this.friends.find(isFriend);
  }
};

const AllFriends = () => (
  <div className="container">
    <h1>Список друзів</h1>
    <ul className="friend-list">
      {
        FriendAPI.all().map(friend => (
          <li key={friend.id}>
            <Link to={`/friends/${friend.id}`} className="friend-link">{friend.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

const Friend = () => {
  let { id } = useParams();
  const friend = FriendAPI.get(parseInt(id, 10));
  if (!friend) {
    return <div>Вибачте, але друга не знайдено</div>;
  }
  return (
    <div className="friend-details">
      <h1>{friend.name} (#{friend.id})</h1>
      <h2>Вік: {friend.age}</h2>
      <h3>Хобі: {friend.hobby}</h3>
      <Link to='/friends' className="back-link">Назад</Link>
    </div>
  );
};

const Friends = () => (
  <Routes>
    <Route path='/' element={<AllFriends />} />
    <Route path=':id' element={<Friend />} />
  </Routes>
);

const Home = () => (
  <div className="container">
    <h1>Ласкаво просимо до довідника друзів</h1>
  </div>
);

const Main = () => (
  <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/friends/*' element={<Friends />} />
    </Routes>
  </main>
);

const Header = () => (
  <header>
    <nav className="navbar">
      <ul>
        <li><Link to='/' className="nav-link">Головна</Link></li>
        <li><Link to='/friends' className="nav-link">Друзі</Link></li>
      </ul>
    </nav>
  </header>
);

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

export default App;
