variants
========

COSMIC / 1000 genomes / GVF integrated visualization

### Importing the database

An example database is provided in db/GVF_DB_Variant.sql. It contains only one
individual. Databases with multiple individuals can be generated from the Perl
scripts in the db folder.

### Building and running the server

```shell
sudo npm install -g node-dev
cd server
npm install
npm run build
node-dev index.js
```

### Building and running the client
```shell
sudo npm install -g bower broccoli-cli
cd client
npm install
bower install
npm run watchify
npm run serve #do this in a separate tab
```

### API example

```
http://localhost:3002/variants?where={%22INDIVIDUAL_ID%22:1,%22COSMIC.ID%22:{%22gt%22:0}}
```
