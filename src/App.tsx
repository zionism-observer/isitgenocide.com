import { ArrowRight } from 'lucide-solid';
import { Setter, Show, createSignal, type Component } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import { Cursor } from './lib/typewriter/components';
import { createTypeWriter } from './lib/typewriter/createTypeWriter';

type Screen = 'DECIDE' | 'QUOTES';
const App: Component = () => {
  const [screen, setScreen] = createSignal<Screen>('DECIDE');

  return (
    <main class='h-full w-2/3 flex flex-col justify-center'>
      <Presence>
        <Show when={screen() === 'DECIDE'}>
          <Decide setScreen={setScreen} />
        </Show>
        <Show when={screen() === 'QUOTES'}>
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
      'The Israeli-Palestinian conflict has been called a genocide...',
      'Some have found this to be a controversial statement calling the allegation anti-semitic.',
    ],
    typeSpeed: 50,
    delaySpeed: 2000,
    deleteSpeed: 30,
  });

  return (
    <Motion exit={{ opacity: 0, transition: { duration: 0.8 } }}>
      <section class='text-left text-stone-400 text-2xl h-32'>
        <span class=''>{typeWriter().text}</span>
        <Cursor />
      </section>
      <section class='flex'>
        <Motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 14, easing: 'ease-in', duration: 1.5 }}
          class='text-stone-400 text-2xl italic mr-4'
        >
          Decide for yourself
        </Motion.span>
        <Motion.button
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 15.5, easing: 'ease-in', duration: 1.5 }}
          class='bg-white/50 rounded-full p-1 hover:bg-white/60 duration-75 ease-in-out hover:shadow-sm hover:shadow-stone-300'
          onclick={() => setTimeout(() => props.setScreen('QUOTES'), 200)}
        >
          <ArrowRight />
        </Motion.button>
      </section>
    </Motion>
  );
};

// TODO: Fix jittery
const Quotes: Component<Slide> = (props) => {
  const typeWriter = createTypeWriter({
    words: [
      'The following are real quotes from Israel state officials and military leaders...',
    ],
    typeSpeed: 50,
    delaySpeed: 2000,
    deleteSpeed: 30,
  });

  return (
    <Motion
      animate={{ opacity: [0, 1] }}
      transition={{ delay: 2.2, easing: 'ease-in', duration: 1.5 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <section class='text-left text-stone-400 text-2xl h-32'>
        <span class=''>{typeWriter().text}</span>
        <Cursor />
      </section>
    </Motion>
  );
};

export default App;
