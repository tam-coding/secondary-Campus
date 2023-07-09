
import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'


export default [

    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },

    //重定向，让项目跑起来的时候访问/让其立马重定向到首页
    // {
    //     path:'/',
    //     redirect:'/home'
    // },
    
]