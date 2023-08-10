
class Config {
    public api_url: String = "http://127.0.0.1:8080/api/";

    constructor() {
        switch (document.location.hostname) {
            case "raina.ovh":
                this.api_url = "https://raina.ovh/api/";
                break;
            
            case "cyberpunk.raina.ovh":
                this.api_url = "https://api.cyberpunk.raina.ovh/api/";
                break;
            default: {
            }
        }
    }
}

export default Config;