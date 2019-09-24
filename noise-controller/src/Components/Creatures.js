import React, { useState, useEffect } from "react";

function Creatures() {
  const [imagesArr, setImagesArr] = useState([]);
  const [isLoud, setIsLoud] = useState(false);
  const [quietInterval, setQuietInterval] = useState(3000);
  const [loudInterval, setLoudInterval] = useState(1000);

  useEffect(() => {
    let myTimer = null;

    if (!isLoud) {
      //Classroom is quiet we push a random image from 1 to 35 at quietInterval
      clearInterval(myTimer);

      myTimer = setInterval(
        () =>
          setImagesArr(images => [
            ...images,
            `/images/image${Math.floor(Math.random() * 35) + 1}.png`
          ]),
        quietInterval
      );
    } else {
      //Classroom is loud we start removing the last animal at loudInterval
      clearInterval(myTimer);

      myTimer = setInterval(
        () => setImagesArr(images => [...images.slice(0, images.length - 1)]),
        loudInterval
      );
    }

    return () => clearInterval(myTimer);
  }, [isLoud, quietInterval, loudInterval]);

  const handleClick = () => {
    setIsLoud(bool => !bool);
  };

  const handleOnChange = (event, callback) => {
    console.log(event);
    console.log(callback);
    callback(event.target.value);
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>{`Set isLoud to ${
          isLoud ? "false" : "true"
        }`}</button>
        <label for="quietInterval">Quiet Interval (ms): </label>
        <input
          id="quietInterval"
          type="text"
          value={quietInterval}
          onChange={e => handleOnChange(e, setQuietInterval)}
        />
        <label for="loudInterval">Loud Interval (ms): </label>
        <input
          id="loudInterval"
          type="text"
          value={loudInterval}
          onChange={e => handleOnChange(e, setLoudInterval)}
        />
      </div>
      {imagesArr
        ? imagesArr.map((image, index) => (
            <img
              style={{ height: "200px", width: "200px" }}
              key={index}
              src={image}
            />
          ))
        : null}
    </div>
  );
}

export default Creatures;
