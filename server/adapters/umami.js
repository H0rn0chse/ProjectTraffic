import dotenv from "dotenv";
import fetch from "node-fetch";

// local .env setup
if (process.env.UMAMI_USER === undefined || process.env.UMAMI_PASSWORD === undefined) {
    dotenv.config();
}

const twoWeeks = 1209600000;
const url = "https://h0rn0chse-umami.herokuapp.com/";

class _Umami {
    constructor () {
        this.id = "umami";
        this.name = "Umami";

        this.username = process.env.UMAMI_USER;
        this.password = process.env.UMAMI_PASSWORD;

        this.token = null;
        this.websites = null;
    }

    async login () {
        if (this.token) {
            return;
        }

        const body = {
            username: this.username,
            password: this.password
        };
        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        };
        const response = await fetch(`${url}api/auth/login`, options);
        const data = await response.json();
        this.token = data.token;
    }

    async fetchViews (identifier) {
        await this.login();

        const startAt = Math.round((Date.now() - twoWeeks));
        const endAt = Math.round(Date.now());
        const unit = "day";
        const timezone = "Europe/Berlin";

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${this.token}`
            }
        };
        const serviceUrl = `${url}api/website/${identifier}/pageviews?start_at=${startAt}&end_at=${endAt}&unit=${unit}&tz=${timezone}`;
        const response = await fetch(serviceUrl, options);
        const data = await response.json();

        return [
            ...data.pageviews.map((viewData) => {
                return {
                    date: viewData.t,
                    count: viewData.y
                };
            }),
            ...data.sessions.map((viewData) => {
                return {
                    date: viewData.t,
                    unique: viewData.y
                };
            }),
        ];
    }

    async fetchReferrer (identifier) {
        await this.login();

        const startAt = 1650405600000 || Math.round((Date.now() - twoWeeks));
        const endAt = 1652997599999 || Math.round(Date.now());
        const type = "referrer";

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${this.token}`
            }
        };

        const serviceUrl = `${url}api/website/${identifier}/metrics?start_at=${startAt}&end_at=${endAt}&type=${type}`;
        const response = await fetch(serviceUrl, options);
        const data = await response.json();
        return data
            .map((referrer) => {
                return {
                    referrer: referrer.x,
                    count: referrer.y,
                };
            })
            .filter((referrer) => {
                return !!referrer.referrer;
            });
    }
}

const Umami = new _Umami();
export default Umami;
