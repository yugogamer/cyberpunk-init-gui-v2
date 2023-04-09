
class Config {
    public api_url: String = "http://127.0.0.1:8080/api/";

    constructor() {
        if (document.location.hostname === "raina.ovh") {
            this.api_url = "https://raina.ovh/api/";
        }
    }
}

export default Config;