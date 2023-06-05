import React from "react";
import { useNavigate } from "react-router-dom";

export default function LiHashtags(props) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/hashtag/${props.id}`);
      }}
    >
      # {props.tag}
    </li>
  );
}
