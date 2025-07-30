<div align="center">
  <h1>Legacy-V9</h1>
</div>


**V9** is a minimal, low-level reactive system designed to build powerful data-driven engines.  
It emphasizes **manual control**, **signal-based updates**, and **performance**, making it perfect for:

- ⚙️ Game engines
- 📊 Dataflow systems
- 🧠 Reactive backend models
- 🧩 Building blocks for tools like Vue/React—but leaner

<div align="center">
  <h2>Features</h2>
</div>

- 📦 Less than 20KB unminified
- ⚡ No dependency tracking or batching—runs **immediately**
- 🎯 Wildcard signal targeting
- 🔧 Fully modular, component-agnostic

<div align="center">
  <h2>Example</h2>
</div>

```js
import { v9 } from "./v9/v9.js";

const myModule =

new v9.module({}, [
  new v9.script({
    trigger() {
      console.log("Triggered script");
    },
    signal: v9.utilities.system_signal_converter(`/`),
  }),
]);

// Will trigger any time that some value in the module is changed.
```

<div align="center">
  <h2>License(MIT)</h2>
</div>

<div align="center">
  <p>
We have an MIT License to help make it worry-free to create projects using</p>
  
  <h1>V9</h1>
</div>
