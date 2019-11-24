import Vue from 'vue';
import VueRouter from 'vue-router';
import demoComponents from './demo-components';
import { isAuthPage } from 'js/config/menu-config';

Vue.use(VueRouter);

const initRouter = () => {
    const routerParam = {
        mode: 'history',
        routes: [{
            path: '/login',
            name: 'Login',
            component: (resolve) => require(['components/login/index'], resolve)
        }, {
            path: '/',
            component: (resolve) => require(['components/app/app-frame'], resolve),
            children: [{
                    path: '',
                    name: 'Home',
                    component: (resolve) => require(['components/home/index'], resolve),
                    meta: { title: '首页', icon: 'icon-monitor' }
                }, {
                    path: '/system-error',
                    name: 'SystemError',
                    component: (resolve) => require(['components/error-pages/500'], resolve),
                    meta: { title: '系统错误' }
                }, {
                    path: '/permission-error',
                    name: 'PermissionError',
                    component: (resolve) => require(['components/error-pages/403'], resolve),
                    meta: { title: '权限错误' }
                },
                {
                    path: '/notfound-error',
                    name: 'NotfoundError',
                    component: (resolve) => require(['components/error-pages/404'], resolve),
                    meta: { title: '页面找不到' }
                },
                {
                    path: '/announcement',
                    name: 'Announcement',
                    component: (resolve) => require(['components/announcement/index'], resolve),
                    meta: { title: '公告' }
                },
                {
                    path: '/announcement/create',
                    name: 'AnnouncementCreate',
                    component: (resolve) => require(['components/announcement/create'], resolve),
                    meta: { title: '添加公告' },
                },
                {
                    path: '/announcement/:id/edit',
                    name: 'AnnouncementEdit',
                    component: (resolve) => require(['components/announcement/edit'], resolve),
                    meta: { title: '编辑公告' },
                    props: true
                },
                {
                    path: '/role',
                    name: 'Role',
                    component: (resolve) => require(['components/role/index'], resolve),
                    meta: { title: 'VIP角色' }
                },
                {
                    path: '/role/create',
                    name: 'RoleCreate',
                    component: (resolve) => require(['components/role/create'], resolve),
                    meta: { title: '添加VIP角色' },
                },
                {
                    path: '/role/:id/edit',
                    name: 'RoleEdit',
                    component: (resolve) => require(['components/role/edit'], resolve),
                    meta: { title: '编辑VIP角色' },
                    props: true
                },
                {
                    path: '/link',
                    name: 'Link',
                    component: (resolve) => require(['components/link/index'], resolve),
                    meta: { title: '友情链接' }
                },
                {
                    path: '/link/create',
                    name: 'LinkCreate',
                    component: (resolve) => require(['components/link/create'], resolve),
                    meta: { title: '添加友情链接' },
                },
                {
                    path: '/link/:id/edit',
                    name: 'LinkEdit',
                    component: (resolve) => require(['components/link/edit'], resolve),
                    meta: { title: '编辑友情链接' },
                    props: true
                },
                {
                    path: '/ad_from',
                    name: 'AdFrom',
                    component: (resolve) => require(['components/ad_from/index'], resolve),
                    meta: { title: '推广链接' }
                },
                {
                    path: '/ad_from/create',
                    name: 'AdFromCreate',
                    component: (resolve) => require(['components/ad_from/create'], resolve),
                    meta: { title: '添加推广链接' },
                },
                {
                    path: '/ad_from/:id/edit',
                    name: 'AdFromEdit',
                    component: (resolve) => require(['components/ad_from/edit'], resolve),
                    meta: { title: '编辑推广链接' },
                    props: true
                },
                {
                    path: '/course_comment',
                    name: 'CourseComment',
                    component: (resolve) => require(['components/course_comment/index'], resolve),
                    meta: { title: '课程评论' }
                },
                {
                    path: '/video_comment',
                    name: 'VideoComment',
                    component: (resolve) => require(['components/video_comment/index'], resolve),
                    meta: { title: '视频评论' }
                },
                {
                    path: '/order',
                    name: 'Order',
                    component: (resolve) => require(['components/order/index'], resolve),
                    meta: { title: '视频评论' }
                },
                {
                    path: '/member',
                    name: 'Member',
                    component: (resolve) => require(['components/member/index'], resolve),
                    meta: { title: '用户' }
                }, {
                    path: '/member/create',
                    name: 'MemberCreate',
                    component: (resolve) => require(['components/member/create'], resolve),
                    meta: { title: '用户' }
                },
                {
                    path: '*',
                    name: 'CommonNotfoundError',
                    component: (resolve) => require(['components/error-pages/404'], resolve),
                    meta: { title: '页面找不到' }
                },
                {
                    path: '/course',
                    name: 'Course',
                    component: (resolve) => require(['components/course/index'], resolve),
                    meta: { title: '课程' }
                },
                {
                    path: '/course/create',
                    name: 'CourseCreate',
                    component: (resolve) => require(['components/course/create'], resolve),
                    meta: { title: '添加课程' },
                },
                {
                    path: '/course/:id/edit',
                    name: 'CourseEdit',
                    component: (resolve) => require(['components/course/edit'], resolve),
                    meta: { title: '编辑课程' },
                    props: true
                },
            ]
        }]
    };

    let router = new VueRouter(routerParam);
    let isFirstRouter = true;

    router.beforeEach((to, from, next) => {
        if (!isFirstRouter && !isAuthPage(to.name)) {
            next({ name: 'PermissionError' });
            return;
        }
        HeyUI.$LoadingBar.start();
        if (to.meta && to.meta.title) {
            document.title = to.meta.title + ' - MeEdu';
        } else {
            document.title = 'MeEdu';
        }
        isFirstRouter = false;
        next();
    });
    router.afterEach(() => {
        HeyUI.$LoadingBar.success();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        let layoutContent = document.querySelector('.h-layout-content');
        if (layoutContent) {
            layoutContent.scrollTop = 0;
        }
    });
    return router;
};

export default initRouter;