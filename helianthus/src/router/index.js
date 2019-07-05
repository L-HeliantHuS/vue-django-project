import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import AddBlog from '@/components/AddBlog'
import About from '@/components/About'
import BlogList from '@/components/BlogList'
import Face from '@/components/Face'
import Login from '@/components/User/Login'
import Register from '@/components/User/Register'
import ROOT from '@/components/User/ROOT'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home},  // 主页
    {path: '/addblog', name: 'AddBlog', component: AddBlog},   // 添加blog
    {path: '/about', name: 'About', component: About},   // 关于
    {path: '/bloglist', name: 'BlogList', component: BlogList},  // 显示blog信息
    {path: '/face', name: 'Face', component: Face},   // 人脸识别
    {path: '/user/login', name: 'Login', component: Login},   // 登录
    {path: '/user/register', name: 'Register', component: Register},   // 注册
    {path: '/user/root', name: 'ROOT', component: ROOT},   // 注册
  ]
})
