/*
The API request builder

Design a flexible way to construct HTTP requests without a single, optional-heavy configuration object.

    Implement a RequestBuilder class that allows method chaining for setting the HTTP method, URL, headers, query parameters, and a JSON body.
    The build() method must validate the configuration before returning the final immutable Request object. It should throw an error if the method is POST but no body was provided, or if the URL has not been set.

*/
type THttpMethod = "GET" | "POST";
type TRequestSettings = {
	method: THttpMethod;
	url?: string;
	headers: Record<string, string>;
	queryParams: Record<string, string>;
	body?: unknown;
	hasBody: false;
};

export class Request {
	public readonly method: THttpMethod;
	public readonly url: string;
	public readonly headers: Readonly<Record<string, string>>;
	public readonly queryParams: Readonly<Record<string, string>>;
	public readonly body?: unknown;

	constructor(
		method: HttpMethod,
		url: string,
		headers: Record<string, string>,
		queryParams: Record<string, string>,
		body?: unknown,
	) {
		this.method = method;
		this.url = url;
		this.headers = Object.freeze({ ...headers });
		this.queryParams = Object.freeze({ ...queryParams });
		this.body = body;

		Object.freeze(this);
	}
}

class RequestBuilder {
	private settings: Partial<TRequestSettings> = {};

	method(method: THttpMethod): this {
		this.settings.method = method;
		return this;
	}

	url(url: string): this {
		this.settings.url = url;
		return this;
	}

	header(name: string, value: string): this {
		this.settings.headers ??= {};
		this.settings.headers[name] = value;
		return this;
	}

	queryParam(name: string, value: string): this {
		this.settings.queryParams ??= {};
		this.settings.queryParams[name] = value;
		return this;
	}

	jsonBody(body: unknown): this {
		this.settings.body = body;
		return this;
	}

	build(): Request {
		if (!this.settings.url) {
			throw new Error("URL must be provided");
		}
		console.log(this.settings.body);

		if (this.settings.method === "POST" && !this.settings.body) {
			throw new Error(`${this.settings.method} requests require a body`);
		}

		return new Request(this.settings);
	}
}
