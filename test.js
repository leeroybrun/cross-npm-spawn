'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const spawnNpm = require('.');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('CrossNpmSpawn', () => {
  it('should be able to spawn NPM process', function() {
    this.slow(5000);
    this.timeout(5000);

    const promise = spawnNpm('show', {_: ['npm', 'version']});

    return Promise.all([
      expect(promise, 'promise').to.be.fulfilled,
      expect(promise, 'return code').to.eventually.have.property('code', 0),
      expect(promise, 'stdout').to.eventually.have.property('stdout').with.length.within(3, 8),
      expect(promise, 'stderr').to.eventually.have.property('stderr', '')
    ]);
  });

  it('should handle errors', function() {
    this.slow(5000);
    this.timeout(5000);

    const promise = spawnNpm('show', {_: ['euhfheu@!&7hd', 'version']});

    return Promise.all([
      expect(promise, 'promise').to.be.fulfilled,
      expect(promise, 'return code').to.eventually.have.property('code', 1),
      expect(promise, 'stdout').to.eventually.have.property('stdout', ''),
      expect(promise, 'stderr').to.eventually.have.property('stderr').with.length.above(10)
    ]);
  });
});
