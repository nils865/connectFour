<script context="module" lang="ts">
    export type Coin = 'redCoin' | 'yellowCoin' | null;
    export type Notification = 'It\'s reds turn' | 'It\'s yellows turn' | 'Yellow won!' | 'Red won!';
    export type Mode = "twoPlayer" | "onePlayer";

    export const columnCount: number = 7;
    export const rowCount: number = 6;
</script>