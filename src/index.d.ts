declare module "parse-css-color" {
  export default parseCSSColor

  export interface Result {
    readonly alpha: number
    readonly type: string
    readonly values: number[]
  }

  function parseCSSColor(str: string): Result | null
}
