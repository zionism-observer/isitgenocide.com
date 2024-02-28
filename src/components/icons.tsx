import { Component } from "solid-js";

interface Icon {
  width?: number;
  height?: number;
  color?: string;
  class?: string;
}
export const IconMusicOn: Component<Icon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "24"}
      height={props.height ? props.height : "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color ? props.color : "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={`lucide lucide-volume-2 ${props.class ? props.class : ""}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
};

export const IconMusicOff: Component<Icon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "24"}
      height={props.height ? props.height : "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color ? props.color : "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={`lucide lucide-volume-x ${props.class ? props.class : ""}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
};
