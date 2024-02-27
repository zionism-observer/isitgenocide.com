import { Show, createSignal, type Component } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { Quotes } from "./components/quotes";
import { Decide, Screen } from "./components/intro";

const App: Component = () => {
  const [screen, setScreen] = createSignal<Screen>("DECIDE");

  return (
    <main class="h-full md:w-2/3 flex flex-col justify-center px-2 md:px-0 container">
      <Presence exitBeforeEnter>
        {/* <Show when={screen() === "DECIDE"}> */}
        {/*   <Motion exit={{ opacity: 0, transition: { duration: 0.8 } }}> */}
        {/*     <Decide setScreen={setScreen} /> */}
        {/*   </Motion> */}
        {/* </Show> */}
        <Show when={true || screen() === "QUOTES"}>
          <Quotes />
        </Show>
      </Presence>
    </main>
  );
};

export default App;
