import VueRouter from 'vue-router';

import dashboardRouter from './dashboard/router';


Vue.use(VueRouter);


export default {
    install() {
        return new VueRouter({
            // mode: 'history',
            routes: [
                ...dashboardRouter,
            ],
        });
    }
};
