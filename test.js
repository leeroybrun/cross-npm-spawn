'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const spawnNpm = require('.');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('CrossNpmSpawn', () => {
  it('should be able to spawn NPM process', function() {
    return expect(spawnNpm('show', {_: ['npm', 'version']})).to.be.fulfilled;
  });
});
