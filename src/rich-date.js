export class RichDate extends Date {
    test() {
        console.log(1111, `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`);
    }
}
