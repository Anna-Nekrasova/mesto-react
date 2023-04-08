import React from "react";

function Card({ cards, onCardClick }) {
    return (
        <section className="elements">
            {cards.map(card => {
                function handleClick() {
                    onCardClick(card);
                }
                return (
                    <div key={card._id} className="elements__item" >
                        <button className="elements__delete" type="button"></button>
                        <img className="elements__image" alt={card.name} src={card.link} onClick={handleClick} />
                        <div className="elements__row">
                            <h2 className="elements__title">{card.name}</h2>
                            <div>
                                <button className="elements__like" type="button"></button>
                                <p className="elements__number">{card.likes.length}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
export default Card;