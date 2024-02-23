import { Cursor } from "../lib/typewriter/components";
import { createTypeWriter } from "../lib/typewriter/createTypeWriter";
import { ArrowRight } from "lucide-solid";
import { Setter, Component, createEffect } from "solid-js";
import { Motion } from "solid-motionone";

export type Screen = "DECIDE" | "QUOTES";

interface Slide {
  setScreen: Setter<Screen>;
}

export const Decide: Component<Slide> = (props) => {
  const typeWriter = createTypeWriter({
    words: [
      "The war in Gaza has been called a genocide...",
      "Some say the allegation is anti-semitic. Is it a genocide?",
    ],
    typeSpeed: 50,
    delaySpeed: 2000,
    deleteSpeed: 30,
  });
  let spanRef: HTMLSpanElement | null;
  let spanRef2: HTMLSpanElement | null;

  const changeColor = () => {
    if (spanRef) {
      spanRef.remove();
      spanRef2.innerHTML =
        "Some say the allegation is anti-semitic. Is it a <span class='color-anim'>genocide?</span>";
    }
  };

  // after 9s change color
  createEffect(() => {
    setTimeout(changeColor, 9000);
  });

  return (
    <>
      <section class="flex text-left text-stone-400 md:text-2xl text-lg md:h-40 h-32">
        <span ref={spanRef}>{typeWriter().text}</span>
        <span ref={spanRef2}></span>
        <Cursor />
      </section>
      <section class="flex items-center">
        <Motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 10, easing: "ease-in", duration: 1.5 }}
          class="text-stone-400 md:text-2xl text-lg italic mr-4"
        >
          Decide for yourself
        </Motion.span>
        <Motion.button
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 10.5, easing: "ease-in", duration: 1.5 }}
          class="bg-white/50 rounded-full p-1 hover:bg-white/60 duration-75 ease-in-out hover:shadow-sm hover:shadow-stone-300"
          onclick={() => setTimeout(() => props.setScreen("QUOTES"), 200)}
        >
          <ArrowRight />
        </Motion.button>
      </section>
    </>
  );
};
