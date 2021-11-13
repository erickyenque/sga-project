export class ServerConfig {
    private static PROTOCOL = 'http';
    private static IP = 'localhost';
    private static NAME_API = 'api-sga';

    public static getUrl(controller, method): string {
        return `${ServerConfig.PROTOCOL}://${ServerConfig.IP}/${ServerConfig.NAME_API}/${controller}/${method}`;
    }
}