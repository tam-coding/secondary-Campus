

export default [
    {
       
        path:'/postdetail/:postid',
        component:()=>import('@/pages/postDetail.vue')
    },
    {
        path:'/postlist',
        component:()=>import('@/pages/postList.vue'),
        // meta:{show:true}
    },
    {
        path:'/add',
        component:()=>import('@/pages/addGoods.vue'),
        // meta:{show:true}
    },
    {
        path:'/home',
        component:()=>import('@/pages/home.vue'),
        // meta:{show:true}
    },
    {
        path:'/login',
        component:()=>import('@/pages/login.vue'),
        // meta:{show:false}
    },
    {
        path:'/register',
        component:()=>import('@/pages/register.vue'),
        // meta:{show:false}
    },

    //重定向，让项目跑起来的时候访问/让其立马重定向到首页
    {
        path:'/',
        redirect:'/home'
    },
    
]