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
    }

    static _formatDate (timestamp) {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${date.getFullYear()}-${month}-${day}`;
    }

    async fetchViews (identifier) {
        try {
            const response = await this.client.request(`GET /repos/${identifier}/traffic/views`, {});
            return response.data.views.map((viewData) => {
                return {
                    date: _Github._formatDate(viewData.timestamp),
                    unique: viewData.uniques,
                    count: viewData.count
                };
            });
        } catch (err) {
            return [];
        }
    }

    async fetchReferrer (identifier) {
        try {
            const response = await this.client.request(`GET /repos/${identifier}/traffic/popular/referrers`, {});
            return response.data.map((referrerData) => {
                return {
                    referrer: referrerData.referrer,
                    count: referrerData.count,
                };
            });
        } catch (err) {
            return [];
        }
    }
}

const Github = new _Github();
export default Github;
