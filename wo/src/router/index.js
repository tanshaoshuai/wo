import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/page/second/' + name)
const pages = name => () => import('@/page/' + name)
export default new Router({
mode: 'history',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home},
        {path: '/button', name: 'c-button', component: pages('c-button')},
        {path: '/switch', name: 'c-switch', component: pages('c-switch')},
        {path: '/data-table', name: 'p-data-table', component: pages('table')},
        {path: '/sourcePool', name: 'sourcePool', component: pages('sourcePool')},
        {path: '/byMySelf', name: 'byMySelf', component: pages('byMySelf')},
        {path: '/adSource', name: 'adSource', component: pages('adSource'),redirect: '/adIsPut',
        children:[
        {path: '/adIsPut',name:'adIsPut',component: page('adIsPut')},
        {path: '/adDelPut',name:'adDelPut',component: page('adDelPut')},
        {path: '/adNotPut',name:'adNotPut',component: page('adNotPut')}
        ]},
        {path: '/myCreat', name: 'myCreat', component: pages('myCreat')},
        {path: '/releaceSource', name: 'releaceSource', component: pages('releaceSource')},
        {path: '/manageNum', name: 'manageNum', component: pages('manageNum')},
        {path: '/schoolDeal', name: 'schoolDeal', component: pages('schoolDeal')},
         {path: '/test', name: 'test', component: pages('test')},
        
        
      ]
    },
    {path: '/login', name: 'login', component: pages('login')}
  ]
})
// 

