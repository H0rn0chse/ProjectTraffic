import { Octokit } from "@octokit/core";
import dotenv from "dotenv";

// local .env setup
if (process.env.GITHUB_TOKEN === undefined) {
    dotenv.config();
}

class _Github {
    constructor () {
        this.id = "github";
        this.name = "Github";

        this.token = process.env.GITHUB_TOKEN;
        this.client = new Octokit({ auth: this.token });
        this.cache = new Map();
    }

    static _formatDate (timestamp) {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${date.getFullYear()}-${month}-${day}`;
    }

    async fetchViews (identifier) {
        if (this.cache.has(`${identifier}-views`)) {
            return this.cache.get(`${identifier}-views`);
        }
        try {
            const response = await this.client.request(`GET /repos/${identifier}/traffic/views`, {});
            const result = response.data.views.map((viewData) => {
                return {
                    date: _Github._formatDate(viewData.timestamp),
                    unique: viewData.uniques,
                    count: viewData.count
                };
            });
            this.cache.set(`${identifier}-views`, result);
            return result;
        } catch (err) {
            return [];
        }
    }

    async fetchReferrer (identifier) {
        if (this.cache.has(`${identifier}-referrer`)) {
            return this.cache.get(`${identifier}-referrer`);
        }
        try {
            const response = await this.client.request(`GET /repos/${identifier}/traffic/popular/referrers`, {});
            const result = response.data.map((referrerData) => {
                return {
                    referrer: referrerData.referrer,
                    count: referrerData.count,
                };
            });
            this.cache.set(`${identifier}-referrer`, result);
            return result;
        } catch (err) {
            return [];
        }
    }
}

const Github = new _Github();
export default Github;
