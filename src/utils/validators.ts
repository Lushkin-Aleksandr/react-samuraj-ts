export const requiredField = (value: string) => value ? undefined : 'Field is required!';

export const maxLengthCreator = (lengthValue: number) => (value: string) => {
    return value && value.length > lengthValue ? `Max length is ${lengthValue}` : undefined
}