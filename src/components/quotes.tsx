import {
  Component,
  For,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from "solid-js";
import { Motion } from "solid-motionone";

type Quote = {
  quote: string;
  "person-name": string;
  "person-title": string;
  "person-url": string;
  "image-url": string;
  "source-url": string;
  hidden: string;
};

export const Quotes: Component = () => {
  const fetchQuotes = async () => {
    try {
      const response = await fetch("/data/quotes.json");
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      let quotes: Quote[] = await response.json();
      // hide hidden quotes
      quotes = quotes.filter((quote) => quote.hidden === "false");
      return quotes;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const [data] = createResource(fetchQuotes);

  let elRef: HTMLDivElement | null;
  createEffect(() => {
    const timeout = setTimeout(() => {
      elRef.removeAttribute("hidden");
    }, 7000);
    return () => clearTimeout(timeout);
  });

  const [maxIndexToDelay, setMaxIndexToDelay] = createSignal(null);

  onMount(() => {
    const windowHeight = window.innerHeight;
    if (windowHeight >= 2192) {
      setMaxIndexToDelay(14);
    } else if (windowHeight >= 1488) {
      setMaxIndexToDelay(10);
    } else if (windowHeight >= 1024) {
      setMaxIndexToDelay(7);
    } else {
      setMaxIndexToDelay(5);
    }
  });

  return (
    <Motion
      animate={{ height: [0, "100%"] }}
      transition={{ delay: 4.6, duration: 3 }}
      class="py-6 w-full h-full"
    >
      <Motion.section
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.8, easing: "ease-in", duration: 1.5 }}
      >
        <span class="text-stone-400 md:text-2xl text-xl text-center pb-20">
          The following are real quotes from Israeli leaders
        </span>
      </Motion.section>
      <section ref={elRef} hidden class="space-y-10 py-4 md:pt-32 pt-12 w-full">
        {data() ? (
          <>
            <For each={data()}>
              {(quote, index) => (
                <QuoteCard
                  quote={quote}
                  index={index()}
                  maxIndexToDelay={maxIndexToDelay()}
                />
              )}
            </For>
          </>
        ) : null}
        <Outro />
      </section>
    </Motion>
  );
};

interface IQuoteCard {
  quote: Quote;
  index: number;
  maxIndexToDelay: number;
}
const QuoteCard: Component<IQuoteCard> = (props) => {
  const [opacity, setOpacity] = createSignal(0);
  let elRef: HTMLDivElement | null;

  onMount(() => {
    if (props.index >= props.maxIndexToDelay) return;

    let delay: number;
    if (props.index === 0) {
      delay = 750;
    } else if (props.index < props.maxIndexToDelay) {
      delay = 2700;
    }

    const t = setTimeout(
      () => {
        setOpacity(1);
      },
      (props.index + 1) * delay + 7000,
    );

    return () => clearTimeout(t);
  });

  createEffect(() => {
    if (props.index < props.maxIndexToDelay) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setOpacity(entry.isIntersecting ? 1 : 0);
      });
    });
    observer.observe(elRef);
    return () => observer.disconnect();
  });

  return (
    <Motion
      animate={{ opacity: opacity() }}
      transition={{ easing: "ease-in", duration: 1.5 }}
      ref={elRef}
    >
      <blockquote
        cite={props.quote["source-url"]}
        class="text-stone-400 md:text-xl text-lg font-light quotes"
      >
        <a
          href={props.quote["source-url"]}
          target="_blank"
          innerHTML={props.quote.quote}
          class=" group hover:text-stone-300 transition ease-in-out delay-100 duration-300 text-wrap"
        ></a>
        <cite class="md:text-lg">
          <a
            href={props.quote["person-url"]}
            target="_blank"
            class="hover:text-stone-300 transition ease-in-out delay-100 duration-300"
          >
            {props.quote["person-name"]}, {props.quote["person-title"]}{" "}
          </a>
        </cite>
      </blockquote>
    </Motion>
  );
};

const Outro: Component = () => {
  const [opacity, setOpacity] = createSignal(0);
  let elRef: HTMLDivElement | null;

  createEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setOpacity(entry.isIntersecting ? 1 : 0);
      });
    });
    observer.observe(elRef);

    return () => observer.disconnect();
  });

  return (
    <div
      class="pt-20 space-y-8 text-stone-400 text-xl font-semibold absolute left-0 text-center w-full md:px-0 px-1"
      ref={elRef}
    >
      <Motion.blockquote
        initial={false}
        animate={{ opacity: opacity() }}
        transition={{ easing: "ease-in", duration: 1.5 }}
        class="text-4xl md:text-8xl tracking-wide leading-loose font-extralight md:pb-24 pb-8"
      >
        "What would I do if my country was committing a genocide? The answer is,
        you're doing it. Right now." — Aaron Bushnell
      </Motion.blockquote>
      <Motion.a
        initial={false}
        animate={{ opacity: opacity() }}
        transition={{ easing: "ease-in", duration: 1.5, delay: 3 }}
        class="flex items-center justify-center hover:text-stone-300 transition ease-in-out delay-100 duration-300 flex-wrap"
        href="https://zionism.observer/"
        target="_blank"
      >
        Powered by
        <img src="/icons/zo.png" class="h-5 w-auto mx-2" />
        Zionism Observer
      </Motion.a>
      <Motion.a
        initial={false}
        animate={{ opacity: opacity() }}
        transition={{ easing: "ease-in", duration: 1.5, delay: 5 }}
        class="flex items-center justify-center hover:text-stone-300 transition ease-in-out delay-100 duration-300 flex-wrap"
        href="https://zionism.observer/archive"
        target="_blank"
      >
        ↗️ Contribute research to the Zionism Observer database
      </Motion.a>
      <Motion.a
        initial={false}
        animate={{ opacity: opacity() }}
        transition={{ easing: "ease-in", duration: 1.5, delay: 7 }}
        class="flex items-center justify-center hover:text-stone-300 transition ease-in-out delay-100 duration-300 flex-wrap"
        href="https://techforpalestine.org/"
        target="_blank"
      >
        In Partnership with
        <img src="/icons/t4p.svg" class="h-4 w-auto mx-2" />
        Tech For Palestine
      </Motion.a>
      <Motion.p
        initial={false}
        animate={{ opacity: opacity() }}
        transition={{ easing: "ease-in", duration: 1.5, delay: 9 }}
      >
        All music and sounds from{" "}
        <a
          class="hover:text-stone-300 transition ease-in-out delay-100 duration-300"
          href="https://pixabay.com/"
        >
          Pixabay.com
        </a>
        . Credit to{" "}
        <a
          class="hover:text-stone-300 transition ease-in-out delay-100 duration-300"
          href="https://pixabay.com/users/sergequadrado-24990007/"
        >
          Serge Quadrado
        </a>{" "}
        and{" "}
        <a
          class="hover:text-stone-300 transition ease-in-out delay-100 duration-300"
          href="https://pixabay.com/users/universfield-28281460/"
        >
          UNIVERSFIELD
        </a>
      </Motion.p>
      <Motion.hr
        initial={false}
        animate={{ opacity: opacity() - 0.5 }}
        transition={{ easing: "ease-in", duration: 1.5, delay: 9 }}
        class="border-t-2 border-gray-600 md:mx-16 mx-2"
      />
      <Motion.div
        initial={false}
        animate={{ opacity: opacity() }}
        transition={{ easing: "ease-in", duration: 1.5, delay: 11 }}
        class="md:pb-20 pb-8 flex flex-col items-center "
      >
        <div class="md:text-sm text-xs italic text-left font-light md:w-2/3 w-full px-2 md:px-0">
          <ul class="space-y-6">
            <li>
              *March 16, 2024: The Yoav Gallant quote was updated to remove
              "Gaza won't return to what it was before. We will eliminate
              everything" due to ambiguity surrounding the context. The
              remainder of the quote is untouched. More details on this update
              can be found{" "}
              <a
                class="hover:text-stone-300 transition ease-in-out delay-100 duration-300 underline"
                href="https://twitter.com/receipts_lol/status/1769020501572067569"
                target="_blank"
              >
                here
              </a>
            </li>
            <li>
              *March 16, 2024: The source for the Yoav Kisch quote was changed
              because the video we originally linked to was deleted. The quote
              is unchanged, but the linked source is now the Law For Palestine's
              database of genocidal intent.
            </li>
          </ul>
        </div>
      </Motion.div>
    </div>
  );
};
