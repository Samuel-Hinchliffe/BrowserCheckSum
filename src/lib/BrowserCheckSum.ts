/**
 * @see    [Linkedin] {@link https://www.linkedin.com/in/samuel-hinchliffe-2bb5801a5/}
 *
 * @summary BrowserCheckSum is a class that provides methods for calculating 
 * the checksum of a file in the browser. Why? because while the browser
 * does support SHA-* crypto algorithms, it doesn't natively convert
 * your data into the required ArrayBuffer format and the back into a hexadecimal format. 
 * This class does that for you.
 * 
 * You don't need to worry about the conversion process. 
 * Just pass in the data and get back the checksum.
 *
 * 
 * Created at: 26/06/2024
*/

import { Algorithm } from './Algorithm';
type supportedDataTypes = File | String | ArrayBuffer | Array<any> | Object | Number;

export class BrowserCheckSum {

    /**
     * Reads a file as an ArrayBuffer.
     * @param file - The file to read.
     * @returns A promise that resolves with the file content as an ArrayBuffer.
     */
    static readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Converts an ArrayBuffer to a hexadecimal string representation.
     * 
     * @param buffer - The ArrayBuffer to convert.
     * @returns The hexadecimal string representation of the ArrayBuffer.
     */
    static arrayBufferToHex(buffer: ArrayBuffer) {
        const byteArray: Uint8Array = new Uint8Array(buffer);
        const hexCodes = [...byteArray].map(value => value.toString(16).padStart(2, '0'));
        return hexCodes.join('');
    }

    /**
     * Reads the contents of a File object and returns it as an ArrayBuffer.
     * @param file - The File object to read.
     * @returns A Promise that resolves to an ArrayBuffer containing the file's contents.
     */
    static async getFileBuffer(file: File): Promise<ArrayBuffer> {
        const arrayBuffer: ArrayBuffer = await BrowserCheckSum.readFileAsArrayBuffer(file);
        return arrayBuffer;
    }

    /**
     * Calculates the checksum of the provided data using the specified algorithm.
     * 
     * @param data - The data to calculate the checksum for. It can be a File, String, Number, ArrayBuffer, Array, or Object.
     * @param algorithm - The algorithm to use for calculating the checksum. Defaults to Algorithm.SHA1.
     * @returns A Promise that resolves to the calculated checksum as a string.
     * @throws An error if the data type is not supported.
     */
    static async checkSum(data: supportedDataTypes, algorithm: Algorithm = Algorithm.SHA1): Promise<string> {

        let buffer: ArrayBuffer = new ArrayBuffer(0);
        let encoder: TextEncoder = new TextEncoder();

        switch (true) {
            case data instanceof File:
                buffer = await BrowserCheckSum.getFileBuffer(data as File);
                break;
            case typeof data === 'string' || typeof data === 'number':
                buffer = encoder.encode(data.toString());
                break;
            case data instanceof ArrayBuffer:
                buffer = data as ArrayBuffer;
                break;
            case data instanceof Array || data instanceof Object:
                const dataString = JSON.stringify(data);
                buffer = encoder.encode(dataString);
                break;
            default:
                throw new Error('Data type not supported. We only support File, String, Number, ArrayBuffer, Array, and Object.');
        }

        const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
        return BrowserCheckSum.arrayBufferToHex(hashBuffer);
    }
}