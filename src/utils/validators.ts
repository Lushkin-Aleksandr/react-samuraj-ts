export const requiredField = (value: string) => value ? undefined : 'Field is required!';

export const maxLengthCreator = (lengthValue: number) => (value: string) => {
    return value.length < lengthValue ? undefined : `Max length is ${lengthValue}`
}