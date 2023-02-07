export type CoinState = "redCoin" | "yellowCoin" | null;
export type Notification =
    | 'It\'s <span style="color: red">reds</span> turn'
    | 'It\'s <span style="color: yellow">yellows</span> turn'
    | '<span style="color: yellow">Yellow</span> won!'
    | '<span style="color: red">Red</span> won!';
export type Gamemode = "twoPlayer" | "onePlayer";
export type CoinList = { children: HTMLCollection; index: number };
