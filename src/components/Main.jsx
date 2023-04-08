function Main({onEditAvatar, onAddPlace, onEditProfile, userName, userDescription, userAvatar}) {
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

        </main>
    );
}
export default Main;