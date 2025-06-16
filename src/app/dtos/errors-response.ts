import { ErrosAPI } from "../interfaces";

export class ErrosAPIResponse {
  #erros: [string, string][] = [];

  constructor(erros: ErrosAPI) {
    for (const [key, value] of Object.entries(erros)) {
      this.#erros.push([key, value]);
    }
  }

  getErrors(): [string, string][] {
    return Array.from(this.#erros);
  }

  hasError(): boolean {
    return this.#erros.length > 0;
  }

}