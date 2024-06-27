<div align="center">
  <a >
    <img src="[./git/logo.jpg](https://github.com/Samuel-Hinchliffe/BrowserCheckSum/blob/master/git/logo.jpg)" alt="Logo" width="100" height="100" style="border-radius: 100%">
  </a>

  <div align="center">
    <h3>🔒 Browser CheckSum 🔒</h3>
  </div>

  <p align="center">
    🤖 A Multi-Type Supported Checksum Library for Browsers
    <br><b>Simple Checksum</b>
    <br />
    <a href="https://github.com//Samuel-Hinchliffe/BrowserCheckSum"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

# ⚡ About

Browser CheckSum is a straightforward checksum library that enables you to generate checksums for various data types. It supports strings, numbers, arrays, objects, and more. Browser CheckSum is a lightweight library that is easy to use and provides a simple API for generating checksums.

Browser CheckSum came around when I needed a universal function to generate checksums for various data types. I wanted a simple and easy-to-use library that could generate checksums for strings, numbers, arrays, objects and **most importantly files**. I couldn't find a library that met my requirements, so I decided to create Browser CheckSum.

Essentially, it's like running the cli tool [sha1sum](https://en.wikipedia.org/wiki/Sha1sum) (any of the sha\*sum commands) on a file

## ❓ Why Browser CheckSum?

Have you ever needed to generate a checksum for a file in the browser? You need to use the poorly designed FileReader API on said file, read the file in as an ArrayBuffer, and then pass this off to the browsers native crypto API and convert that back into human readable hex.

So instead of this:<br>
**File -> Promise Wrapped FileReader -> ArrayBuffer -> Crypto API -> HashBuffer -> Hexed Hash**
(And this is just the workflow for a file, not even a string or object!)

You can do this:
**File -> Browser CheckSum -> Hexed Hash**

```typescript
const checksum: string = await BrowserCheckSum.fileChecksum(file, "SHA-256");
```

Why should it be anymore complicated than that?

So why would you use Browser CheckSum? Edge computing, client-side security, content-addressable storage keys or just to generate checksums in the browser. Let's say, you operate a p2p browser file sharing service, and you want to validate the integrity of the files being shared. You could use Browser CheckSum to generate checksums for the files and validate them on the client-side.

## 💻 Usage

1. Installation using npm:

```bash
npm browser-checksum
```

2. Import it into your project:

```javascript
import { BrowserCheckSum } from "browser-checksum";
```

## 🤖 Examples

```typescript
import { BrowserCheckSum } from "browser-checksum";

// Calculate the checksum of 'Hello, World!' in SHA1
const checksum = await BrowserCheckSum.checkSum("Hello, World!");

// Calculate the checksum of a file in SHA2-56
const file = document.getElementById("FileForm").files[0];
const fileChecksum = await BrowserCheckSum.fileChecksum(file, "SHA-256");

// Calculate the checksum of an object in SHA-384
const object = { key: "value" };
const objectChecksum = await BrowserCheckSum.checkSum(object, "SHA-384");

// Calculate the checksum of an array in SHA1
const array = [1, 2, 3, 4, 5];
const arrayChecksum = await BrowserCheckSum.checkSum(array, "SHA-1");

// Calculate the checksum of an array buffer in SHA-256
const arrayBuffer = new ArrayBuffer(16);
const arrayBufferChecksum = await BrowserCheckSum.checkSum(arrayBuffer, "SHA-256");
```

## 🐔 Limitations

The library is limited to the algorithms supported by the browser's native crypto API. This means that the library does not support MD5 or SHA-0 etc. Therefore it's limited to the following algorithms:

- SHA-1
- SHA-256
- SHA-384
- SHA-512

Due to its reliance on the browser's native crypto API, the library is only compatible with es2017 / ES8 browsers and above (Which is 98% of browsers).
