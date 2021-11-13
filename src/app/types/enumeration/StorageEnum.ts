class StorageEnum {
    static SESSION_SGA = new StorageEnum("SESSION_SGA");

    private key: string;

    private constructor(key: string) {
        this.key = key;
    }

    public getKey(): string {
        return this.key;
    }
}
export default StorageEnum;