//import './App.css';
import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { api } from '../utils/Api.js';

function App() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = React.useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [userInfo, setUserInfo] = React.useState({avatar:'', name:'', about:''})
  const [cardInfo, setCardInfo] = React.useState([])

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

  React.useEffect(() => {
    api.getDataUserInfo()
    .then((user) => {
      setUserInfo(user);
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
    <div className="page">
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditProfile={handleEditProfileClick}
        userName={userInfo.name}
        userDescription={userInfo.about}
        userAvatar={userInfo.avatar}
        cards={cardInfo}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        onClose={closeAllPopups}
        isOpen={isEditPopupOpen}
        buttonText="Сохранить">
        <div className="popup__content">
          <input type="text" className="popup__text popup__text_type_name" id="userName" minLength="2" maxLength="40" name="name" placeholder="Имя" required />
          <span className="userName-error popup__error popup__error_name"></span>
          <input type="text" className="popup__text popup__text_type_about" id="userAbout" minLength="2" maxLength="200" name="about" placeholder="О себе" required />
          <span className="userAbout-error popup__error popup__error_about"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="new-card"
        title="Новое место"
        onClose={closeAllPopups}
        isOpen={isNewCardPopupOpen}
        buttonText="Создать">
        <div className="popup__content">
          <input type="text" className="popup__text popup__text_type_title" id="title" minLength="2" maxLength="30" name="name" placeholder="Название" required />
          <span className="title-error popup__error popup__error_title"></span>
          <input type="url" className="popup__text popup__text_type_link" id="link" name="link" placeholder="Ссылка на картинку" required />
          <span className="link-error popup__error popup__error_link"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        onClose={closeAllPopups}
        buttonText="Да">
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        onClose={closeAllPopups}
        isOpen={isAvatarPopupOpen}
        buttonText="Сохранить">
        <div className="popup__content">
          <input type="url" className="popup__text popup__text_type_link" id="avatar" name="link" placeholder="Ссылка на аватар" required />
          <span className="avatar-error popup__error popup__error_link"></span>
        </div>
      </PopupWithForm>

      <ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      />

    </div>
  );
}

export default App;
