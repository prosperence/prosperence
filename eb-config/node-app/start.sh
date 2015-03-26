#!/usr/bin/env bash
cd /tmp

rm -R prosperence; true

git clone https://github.com/scottrice10/prosperence.git

cd prosperence
git checkout dev

npm install --unsafe-perm
npm start
