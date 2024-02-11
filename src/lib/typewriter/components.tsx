import { Component } from 'solid-js';
import { TypewriterProps, createTypeWriter } from './createTypeWriter';
import styles from './styles.module.css';

interface ITypeWriterProps extends TypewriterProps {
  cursor?: boolean;
  cursorStyle?: string;
  cursorColor?: string;
}
export const Typewriter: Component<ITypeWriterProps> = (props) => {
  const currentState = createTypeWriter({
    words: props.words,
    loop: props.loop === undefined ? 1 : props.loop,
    typeSpeed: props.typeSpeed === undefined ? 80 : props.typeSpeed,
    deleteSpeed: props.deleteSpeed === undefined ? 50 : props.deleteSpeed,
    delaySpeed: props.delaySpeed === undefined ? 1500 : props.delaySpeed,
    onLoopDone: props.onLoopDone,
    onType: props.onType,
  });

  return (
    <>
      <span>{currentState().text}</span>
      {props.cursor && (
        <Cursor
          cursorStyle={props.cursorStyle}
          cursorColor={props.cursorColor}
        />
      )}
    </>
  );
};

export const Cursor = (props: ICursorProps) => {
  return (
    <span
      style={{ color: props.cursorColor ?? 'inherit' }}
      class={styles.blinkingCursor}
    >
      {props.cursorStyle ?? '|'}
    </span>
  );
};

interface ICursorProps {
  cursorStyle?: string;
  cursorColor?: string;
}
