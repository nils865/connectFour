<script context="module" lang="ts">
    export type Coin = 'redCoin' | 'yellowCoin' | null;
    export type Notification = 'It\'s reds turn' | 'It\'s yellows turn' | 'Yellow won!' | 'Red won!';
    export type Mode = "twoPlayer" | "onePlayer";

    export const columnCount: number = 7;
    export const rowCount: number = 6;

    export function addBlink(e: HTMLElement) {
        e.classList.add('shouldBlink');
    }

    export function removeBlink() {
        const elements = document.getElementsByClassName('column');

        for (let i = 0; i < elements.length; i++) {
            const children = elements[i].children;

            for (let j = 0; j < children.length; j++) {
                const currentChild = children[j].children[0];

                if (currentChild.classList.contains('shouldBlink')) {
                    currentChild.classList.remove('shouldBlink');
                }
            }
        }
    }
    
    export function blink() {
        const elements = document.getElementsByClassName('column');

        for (let i = 0; i < elements.length; i++) {
            const children = elements[i].children;

            for (let j = 0; j < children.length; j++) {
                const currentChild = children[j].children[0];

                if (currentChild.classList.contains('shouldBlink')) {
                    currentChild.classList.add('blink');
                }
            }
        }

        removeBlink();
    }
</script>