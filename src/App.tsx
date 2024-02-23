import { ArrowRight } from "lucide-solid";
import {
  For,
  Setter,
  Show,
  createEffect,
  createResource,
  createSignal,
  type Component,
} from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { Cursor } from "./lib/typewriter/components";
import { createTypeWriter } from "./lib/typewriter/createTypeWriter";

type Screen = "DECIDE" | "QUOTES";

const App: Component = () => {
  const [screen, setScreen] = createSignal<Screen>("DECIDE");

  return (
    <main class="h-full md:w-2/3 flex flex-col justify-center px-2 md:px-0 container">
      <Presence exitBeforeEnter>
        <Show when={screen() === "DECIDE"}>
          <Motion exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <Decide setScreen={setScreen} />
          </Motion>
        </Show>
        <Show when={screen() === "QUOTES"}>
          <Quotes setScreen={setScreen} />
        </Show>
      </Presence>
    </main>
  );
};

interface Slide {
  setScreen: Setter<Screen>;
}
const Decide: Component<Slide> = (props) => {
  const typeWriter = createTypeWriter({
    words: [
      "The war in Gaza has been called a genocide...",
      "Some say the allegation is anti-semitic.",
    ],
    typeSpeed: 50,
    delaySpeed: 2000,
    deleteSpeed: 30,
  });

  return (
    <>
      <section class=" text-left text-stone-400 md:text-2xl text-lg md:h-40 h-32">
        <span class="">{typeWriter().text}</span>
        <Cursor />
      </section>
      <section class="flex items-center">
        <Motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 14, easing: "ease-in", duration: 1.5 }}
          class="text-stone-400 md:text-2xl text-lg italic mr-4"
        >
          Is it genocide? Decide for yourself
        </Motion.span>
        <Motion.button
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 15.5, easing: "ease-in", duration: 1.5 }}
          class="bg-white/50 rounded-full p-1 hover:bg-white/60 duration-75 ease-in-out hover:shadow-sm hover:shadow-stone-300"
          onclick={() => setTimeout(() => props.setScreen("QUOTES"), 200)}
        >
          <ArrowRight />
        </Motion.button>
      </section>
    </>
  );
};

const Quotes: Component<Slide> = (props) => {
  const fetchQuotes = async () => {
    try {
      const response = await fetch("/data/quotes.json");
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const quotes: Quote[] = await response.json();
      return quotes;
      // Do something with the quotes
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const [data] = createResource(fetchQuotes);

  return (
    <Motion
      animate={{ height: [0, "100%"] }}
      transition={{ delay: 4.6, duration: 3 }}
      class="py-6"
    >
      <Motion.section
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.8, easing: "ease-in", duration: 1.5 }}
      >
        <span class="text-stone-400 md:text-2xl text-center">
          The following are real quotes from Israeli state officials and
          military leaders
        </span>
      </Motion.section>
      <Motion.section
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 8, duration: 1 }}
        class="h-full space-y-10 py-4"
      >
        <For each={data()}>{(item, index) => <PersonCard {...item} />}</For>
      </Motion.section>
    </Motion>
  );
};

type Quote = {
  quote: string;
  "person-name": string;
  "person-title": string;
  "person-url": string;
  "image-url": string;
  "source-url": string;
};
const PersonCard: Component<Quote> = (props) => {
  const [isVisible, setVisible] = createSignal(false);
  let elRef: HTMLDivElement | null;

  createEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(elRef);
  });

  return (
    <div
      class={`flex gap-6 fade-in-section ${isVisible() ? "is-visible" : ""}`}
      ref={elRef}
    >
      <img
        src={props["image-url"]}
        alt={props["person-name"]}
        class={`md:w-20 md:h-28 w-12 h-20 blur-sm  `}
        style={{
          "object-fit": "cover",
          filter: "grayscale(100%)",
        }}
      />
      <blockquote
        cite={props["source-url"]}
        class="text-stone-400 md:text-lg text-xs font-thin font-sans"
      >
        {props.quote}
        <cite class="md:text-lg text-xs">
          {props["person-name"]}, {props["person-title"]}
        </cite>
      </blockquote>
    </div>
  );
};

export default App;
