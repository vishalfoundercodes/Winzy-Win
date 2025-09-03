import React from 'react'

export default function AvitorImage({ title }) {
  return (
    <div className="mt-1 cursor-pointer rounded-[15px] overflow-hidden p-2">
      <img
        src={title}
        alt="Aviator Game"
        className="w-full h-auto  block"
      />
    </div>
  );
}
