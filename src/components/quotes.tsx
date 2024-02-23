import {
  Component,
  For,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { Motion } from "solid-motionone";

type Quote = {
  quote: string;
  "person-name": string;
  "person-title": string;
  "person-url": string;
  "image-url": string;
  "source-url": string;
};

export const Quotes: Component = () => {
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
          The following are real quotes from Israeli leaders
        </span>
      </Motion.section>
      <Motion.section
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 8, duration: 1 }}
        class="h-full space-y-10 py-4"
      >
        <For each={data()}>{(item) => <QuoteCard {...item} />}</For>
      </Motion.section>
    </Motion>
  );
};

const QuoteCard: Component<Quote> = (props) => {
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
      class={`w-full flex gap-6 fade-in-section ${isVisible() ? "is-visible" : ""}`}
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
        class="text-stone-400 md:text-lg text-xs font-thin font-sans grow"
      >
        <div innerHTML={props.quote}></div>
        <cite class="md:text-lg text-xs">
          <a
            href={props["person-url"]}
            target="_blank"
            class="hover:underline hover:underline-offset-4"
          >
            {props["person-name"]}
          </a>
          , {props["person-title"]}{" "}
        </cite>
        <a
          href={props["source-url"]}
          target="_blank"
          class="hover:underline hover:underline-offset-4 text-sm font-serif float-right"
        >
          (Source)
        </a>
      </blockquote>
    </div>
  );
};
