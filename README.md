# braid-system-info

Presents system info as [braid-http](https://braid.news) URLs.

## Why?

This is a simple example to help understand Braid subscriptions.

## Get started

First, install experimental `braid-protocol` project via git, and `yarn link` it:

```bash
git clone https://github.com/josephg/braid-protocol.git
cd braid-protocol
yarn
./node_modules/typescript/bin/tsc
yarn link
```

Install dependencies...

```bash
cd braid-system-info
yarn install
yarn link braid-protocol
```

...then start the dev server:

```bash
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your system information.
