import Card from './Card.jsx';

function Main({ onEditAvatar, onAddPlace, onEditProfile, userName, userDescription, userAvatar, cards, onCardClick }) {
    return (
        <main className="content">

            <section className="profile">

                <div className="profile__info">
                    <div className="profile__cover" onClick={onEditAvatar}>
                        <img className="profile__avatar" alt="Аватар" id="userAvatar" name="avatar" src={userAvatar} />
                    </div>
                    <div>
                        <div className="profile__name">
                            <h1 className="profile__title">{userName}</h1>
                            <button className="profile__edit" type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add" type="button" onClick={onAddPlace}></button>

            </section>

            <section className="elements">
                {cards.map((item) => 
                    <Card 
                        onCardClick={onCardClick}
                        card={item}
                        key={item._id}
                        name={item.name}
                        link={item.link}
                        likes={item.likes}
                    />
                )}
            </section>

        </main>
    );
}
export default Main;