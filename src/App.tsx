import {
  Show,
  createSignal,
  type Component,
  createEffect,
  onMount,
} from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { Quotes } from "./components/quotes";
import { Decide, Screen } from "./components/intro";
import { IconMusicOff, IconMusicOn } from "./components/icons";
import { createAudio, makeAudioPlayer } from "@solid-primitives/audio";

const App: Component = () => {
  const [screen, setScreen] = createSignal<Screen>("DECIDE");
  const [music, setMusic] = createSignal(false);
  const [volume, setVolume] = createSignal(1);
  const [backgroundMusic] = createAudio("/music/background.mp3", music, volume);
  const [warEffect] = createAudio("/music/war.mp3", music, volume);
  backgroundMusic.player.loop = true;
  warEffect.player.loop = true;

  createEffect(() => {
    if (screen() === "QUOTES") {
      setMusic(true);
    }
  });

  return (
    <>
      <main class="h-full md:w-2/3 flex flex-col justify-center px-2 md:px-0 container">
        <Presence exitBeforeEnter>
          <Show when={screen() === "DECIDE"}>
            <Motion exit={{ opacity: 0, transition: { duration: 0.8 } }}>
              <Decide setScreen={setScreen} />
            </Motion>
          </Show>
          <Show when={screen() === "QUOTES"}>
            <Quotes />
          </Show>
        </Presence>
      </main>
      <Show when={screen() === "QUOTES"}>
        <button
          id="musicBtn"
          onclick={() => setMusic((prev) => !prev)}
          class="w-fit p-1 h-auto rounded-full transition duration-300 transform hover:scale-105 hover:bg-white hover:bg-opacity-20 fixed bottom-10 right-10"
        >
          {music() ? (
            <IconMusicOn color="rgb(168 162 158)" />
          ) : (
            <IconMusicOff color="rgb(168 162 158)" />
          )}
        </button>
      </Show>
    </>
  );
};

export default App;
