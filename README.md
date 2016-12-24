# Vision Library

**Vision Library** is a photo library with object recognition allowing automated tagging of photos and search.

## Team

  - __Product Owner__: Susan Suhyun Hong
  - __Scrum Master__: Louis Bergeron
  - __Development Team Members__: Nimmy Isaac, Michael Bing Dai

## Table of Contents

1. [Requirements](#requirements)
1. [Get Started](#get-started)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running](#running)
    1. [User Experience](#user-experience)
1. [Team](#team)
1. [Contributing](#contributing)

## Get Started
### Installing Dependencies
#### Requirements

- Node 4
- MongoDB
- Imagemagick

From within the root directory:

OSX
```sh
npm install
brew install imagemagick
```
Debian
```sh
npm install
apt-get install imagemagick
```

### Running

- To start the server:
Mongodb must be installed and running
From within the root directory:
```sh
npm start
```
- Transpile the react code from within the root directory by running `npm build` to build a production webpack javascript bundle.

### User Experience
- After uploading a picture, photos will be added to the library with tags and thumbnails automatically associated with that picture.
- Double clicking a thumbnail will open the full photo in a larger view where arrow keys can move between photos.
- A single click on a thumbnail will select a photo.
- Searching for a tag will display all photos with the that tag.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
