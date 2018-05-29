import RavenVue from 'raven-js/plugins/vue';
import {version} from '../../package.json';

if (process.env.NODE_ENV === 'production') {
  Raven
    .config('http://43bf93254d9d46ba9347c7374e6bb718@sentry.5x5x.com/17', {
      release: version,
      environment: process.env.ENVIRONMENT
    })
    .addPlugin(RavenVue, Vue)
    .install();
}
