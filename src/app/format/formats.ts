export namespace Formats {
	export function plain_text(input: string): string {
		return input;
	}
	
	export function mathjax(input: string): string {
		return "\\(" + input + "\\)";
	}
}
