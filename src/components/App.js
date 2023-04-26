//import './App.css';
import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = React.useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  //const [userInfo, setUserInfo] = React.useState({ avatar: '', name: '', about: '' });
  const [cardInfo, setCardInfo] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ avatar: '', name: '', about: '' });

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsNewCardPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditPopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsNewCardPopupOpen(false);
    setIsEditPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.deleteOrAddLikeCard(isLiked, card._id)
      .then((newCard) => {
        setCardInfo((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCard = cardInfo.filter((item) => item._id !== card._id);
        setCardInfo(newCard);
      })
  }

  function handleUpdateUser({ name, about }) {
    api.sendDataUserInfo({
      userName: name,
      userAbout: about,
    })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.sendDataAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdatePlaceSubmit({ title, link }) {
    api.sendDataCards(title, link)
      .then((newCard) => {
        setCardInfo([newCard, ...cardInfo]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    api.getDataUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

    api.getDataCards()
      .then((cards) => {
        setCardInfo(cards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          cards={cardInfo}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isNewCardPopupOpen} onClose={closeAllPopups} onAddPlace={handleUpdatePlaceSubmit} />

        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          onClose={closeAllPopups}
          buttonText="Да">
        </PopupWithForm>

        <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
