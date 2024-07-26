import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import React from "react";

export default function ActiveCollaborators() {
  // to get all users that r editing the document
  const others = useOthers();
  // extracting all users that r editing the document
  const collaborators = others.map((other) => other.info);
  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className="inline-block size-8 rounded-full ring-2 ring-dark-100"
            style={{ border: `3px solid ${color}` }}
          />
        </li>
      ))}
    </ul>
  );
}
