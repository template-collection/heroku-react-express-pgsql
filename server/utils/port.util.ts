
export class Port {
    public static normalize(port: any): number {
        return parseInt(port, 10);
    }

    public static ensurePort(fallbackPort: number): number {
        return process.env.PORT == undefined ? fallbackPort : this.normalize(process.env.PORT);
    }
}