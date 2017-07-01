export var Formats = {
	plain_text: (input: string): string => {
		return input;
	},
	chemical: (input: string): string => {
		return '';
	}
}

export function format(textToFormat: string, formatName: string): string {
	return Formats[formatName](textToFormat);
}
