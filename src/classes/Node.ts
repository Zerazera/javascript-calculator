export default class Node {
    public value: any;
    public next: Node | null;

    constructor(val: any) {
        this.value = val;
        this.next = null;
    }
}