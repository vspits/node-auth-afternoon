import React from 'react';
import AddTreasure from './AddTreasure';

export default function Treasure(props) {
  const treasure = props.treasure.map((item, index) => {
    return <img src={item.image_url} key={index} alt="" />;
  });
  return (
<<<<<<< HEAD
    <div >
      {props.addMyTreasure ?
        <AddTreasure />
        : null}
=======
    <div>
      {props.addMyTreasure ? <AddTreasure /> : null}
>>>>>>> 8b83a479e4c39721046e42909d4b30c1bdfa5cd1
      {treasure}
    </div>
  );
}
