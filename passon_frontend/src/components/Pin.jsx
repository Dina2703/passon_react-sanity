import React from "react";
import { urlFor } from "../client";

const Pin = ({ pin }) => {
  console.log(pin);
  const { postedBy, image, destination, _id } = pin;
  return (
    <div>
      <img
        src={urlFor(image).width(250).url()}
        alt="user"
        className="rounded-lg w-full"
      />
      {pin.postedBy.userName}
    </div>
  );
};

export default Pin;
