// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

import sinon from 'sinon';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { expectEqual } from './chai-expectEqual';
chai.use(chaiEnzyme());
chai.use(expectEqual);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

// Include all .js files under `app`, except app.js, reducers.js, and routes.js.
// This is for code coverage
const context = require.context('../../app', true, /^^((?!(app|reducers|routes)).)*\.js$/);
context.keys().forEach(context);
