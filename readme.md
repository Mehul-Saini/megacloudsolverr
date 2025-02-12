# mega-embed-2

Web service that gets Megacloud.tv embed-2 streams. Based on https://github.com/drblgn/rabbit_wasm/tree/main and https://github.com/consumet/consumet.ts/tree/master/src/extractors/megacloud.
<br><br>


## Usage

http://localhost:4000/{embed-id}

http://localhost:4000/get/?url={megacloud-tv-url}



## Installation

Run under node.js, inside docker container or deploy to vercel. Port can be changed via env.

**Node**

To build: `npm install && npm run build`

To run: `npm run start`

**Docker**

To build: `docker build -t mega-embed-2:latest .`

To run: `docker run --init --restart=always --name mega-embed-2 -d -p 4000:4000 mega-embed-2:latest`

**Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fbitbucket.org%2Fgeordilaforge%2Fmega-embed-2%2Fsrc%2Fmaster%2F&project-name=mega-embed-2)
