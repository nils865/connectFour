import { writable, type Writable } from "svelte/store";
import type { Coin, Notification } from "./types";

export const notification: Writable<Notification> = writable("It\'s reds turn");
export const winstate: Writable<boolean> = writable(false);
export const coin: Writable<Coin> = writable("redCoin");