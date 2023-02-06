import { writable, type Writable } from "svelte/store";
import type { Coin, Notification, Gamemode } from "./types";

export const notification: Writable<Notification> = writable(`It's <span style="color: red">reds</span> turn`);
export const winstate: Writable<boolean> = writable(false);
export const coin: Writable<Coin> = writable("redCoin");
export const gamemode: Writable<Gamemode> = writable("twoPlayer");