import { getMediaMatch } from "./getMediaMatch";

export const isDarkTheme = () => getMediaMatch("(prefers-color-scheme: dark)");
