import Typewriter from "typewriter-effect/dist/core";
import { ArrowRight } from "lucide-solid";
import { Setter, Component, onMount } from "solid-js";
import { Motion } from "solid-motionone";

export type Screen = "DECIDE" | "QUOTES";

interface Slide {
  setScreen: Setter<Screen>;
}

export const Decide: Component<Slide> = (props) => {
  onMount(() => {
    const t = new Typewriter(spanRef, {
      delay: 50,
      deleteSpeed: 10,
    });
    t.pauseFor(300)
      .typeString("The war in Gaza has been called a genocide...")
      .pauseFor(3000)
      .deleteAll()
      .typeString("Some say this allegation is anti-semitic.")
      .pauseFor(1200)
      .typeString(" But is it a <span class='color-anim'>genocide?</span>")
      .start();
  });

  let spanRef: HTMLSpanElement | null;

  return (
    <>
      <section class="flex text-left text-stone-400 md:text-2xl text-xl md:h-40 h-32 relative">
        <span ref={spanRef}></span>
      </section>
      <section class="flex items-center text-stone-400 md:text-2xl text-xl">
        <Motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 16, easing: "ease-in", duration: 3.5 }}
          class="italic mr-4"
        >
          Decide for yourself
        </Motion.span>
        <Motion.button
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 16.5, easing: "ease-in", duration: 3.5 }}
          class="bg-white/50 rounded-full p-1 hover:bg-white/60 duration-75 ease-in-out hover:shadow-sm hover:shadow-stone-300 relative animate-pulse"
          onclick={() => setTimeout(() => props.setScreen("QUOTES"), 200)}
        >
          <ArrowRight />
          {/* <div class="rounded-full p-1 opacity-50 bg-white absolute top-0 right-0 animate-pulse"></div> */}
        </Motion.button>
      </section>
    </>
  );
};
