import css from "./content.css?inline";
import { initialize } from "./navigator";
import { startObserver } from "./observer";

const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

initialize();
startObserver();
