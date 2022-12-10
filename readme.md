## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

## My personal take on the project

In my case, I've made the logic so in order for an address to make a transfer he needs a signature with it's private key. To make things easier to test, I've created a section where the user can insert his private key (A PRIVATE KEY WITH NO REAL FUNDS PLEASE!!) and the app will generate a signature.

Then the user can can copy the message hash, the signature and the recovery bit (the three of them will appear on screen) and paste them in the "Transfer" section, fill the recipient and amount and the transfer will occur. The server checks that the signature provided it hasn't been used already.

In the Wallet section the user can check the balances that the three example adresses do transfers with them

## Demo

This is an image of what you get when you start the frontend and server.

![Screenshot from 2022-12-10 18-58-59](https://user-images.githubusercontent.com/90318659/206869266-97688d35-d085-4975-aa36-6297c233c3f5.png)

## Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
