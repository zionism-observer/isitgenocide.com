import { ArrowRight } from 'lucide-solid';
import { Setter, Show, createSignal, type Component } from 'solid-js';
import { Motion, Presence } from 'solid-motionone';
import { Cursor } from './lib/typewriter/components';
import { createTypeWriter } from './lib/typewriter/createTypeWriter';

type Screen = 'DECIDE' | 'QUOTES';
const App: Component = () => {
  const [screen, setScreen] = createSignal<Screen>('DECIDE');

  return (
    <main class='h-full md:w-2/3 flex flex-col justify-center px-2 md:px-0 container'>
      <Presence exitBeforeEnter>
        <Show when={screen() === 'DECIDE'}>
          <Motion exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <Decide setScreen={setScreen} />
          </Motion>
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
    <>
      <section class=' text-left text-stone-400 md:text-2xl text-lg md:h-40 h-32'>
        <span class=''>{typeWriter().text}</span>
        <Cursor />
      </section>
      <section class='flex items-center'>
        <Motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 14, easing: 'ease-in', duration: 1.5 }}
          class='text-stone-400 md:text-2xl text-lg italic mr-4'
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
    </>
  );
};

const Quotes: Component<Slide> = (props) => {
  return (
    <Motion
      animate={{ height: [0, '100%'] }}
      transition={{ delay: 4.6, duration: 3 }}
    >
      <Motion.section
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.8, easing: 'ease-in', duration: 1.5 }}
      >
        <span class='text-stone-400 md:text-2xl text-lg'>
          The following are real quotes from Israeli state officials and
          military leaders
        </span>
      </Motion.section>
    </Motion>
  );
};

export default App;
