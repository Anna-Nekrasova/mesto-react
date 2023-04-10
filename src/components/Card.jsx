import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <div key={props._id} className="elements__item" >
            <button className="elements__delete" type="button"></button>
            <img className="elements__image" alt={props.name} src={props.link} onClick={handleClick} />
            <div className="elements__row">
                <h2 className="elements__title">{props.name}</h2>
                <div>
                    <button className="elements__like" type="button"></button>
                    <p className="elements__number">{props.likes.length}</p>
                </div>
            </div>
        </div>
    );
}
    
export default Card;