import Node from "./Node";

export default class Queue {
    private first: Node | null
    private last: Node | null
    private len: number

    constructor() {
        this.first = null
        this.last = null
        this.len = 0
    }

    public enqueue(this: Queue, val: any) {
        const node = new Node(val)

        if (this.last === null) this.first = this.last = node
        else {
            this.last.next = node
            this.last = node
        }

        this.len = this.len + 1
    }

    public dequeue(this: Queue) {
        if (this.first === null) return null
        
        const node = this.first

        if (node.next === null) this.first = this.last = null
        else this.first = node.next

        this.len = this.len - 1;
        return node.value
    }

    public get length() {
        return this.len
    }

    public peek(this: Queue) {
        return this.first === null ? null : this.first.value
    }
}