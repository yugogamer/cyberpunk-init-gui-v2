
let map = {
    "raina.ovh": "https://raina.ovh/api/",
    "cyberpunk.raina.ovh": "https://api.cyberpunk.raina.ovh/api/"
}

class Config {
    public api_url: String = "http://127.0.0.1:8080/api/";

    constructor() {
        let hostname = window.location.hostname;
        if (map[hostname]) {
            this.api_url = map[hostname];
        }

        console.log(`API URL: ${this.api_url}`);
    }
}

export default Config;