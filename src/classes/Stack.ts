import Node from "./Node";

export default class Stack {
    private first: Node | null
    private len: number

    constructor() {
        this.first = null
        this.len = 0
    }

    public push(this: Stack, val: any) {
        const node = new Node(val)

        node.next = this.first
        this.first = node

        this.len = this.len + 1
    }

    public pop(this: Stack) {
        if (this.first === null) return null

        const node = this.first
        this.first = node.next

        this.len = this.len - 1
        return node.value
    }

    public peek(this: Stack) {
        return this.first === null ? null : this.first.value
    }

    public get length() {
        return this.len
    }
}