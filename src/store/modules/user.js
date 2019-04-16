import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import { userOpt,roleOpt } from '@/sqlMap.js'
const user = {
    state: {
        token: getToken(),
        name: '',
        email: '',
        avatar: '',
        createTime: '',
        roles: [],
        // 第一次加载菜单时用到
        loadMenus: false
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_CREATE_TIME: (state, createTime) => {
            state.createTime = createTime
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_LOAD_MENUS: (state, loadMenus) => {
            state.loadMenus = loadMenus
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username
            const password = userInfo.password
            const rememberMe = userInfo.rememberMe
            return new Promise((resolve, reject) => {
                var sql = userOpt.login.replace('?', username).replace('?', password)
                this._vm.$http.post('action', { sql: sql }).then(res => {
                    if (res.data.length==0) {
                        reject('账号密码错误')
                    }
                    var user = res.data[0]
                    sql=roleOpt.find.replace('?',user.id)
                    this._vm.$http.post('action', { sql: sql }).then(res => {
                        user.roles=res.data
                        setToken('123', rememberMe)
                        commit('SET_TOKEN', '123')
                        setUserInfo(user, commit)
                        // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
                        commit('SET_LOAD_MENUS', true)
                        this._vm.$storage.set('userInfo',user)
                        resolve()
                    })
                   
                }).catch(error => {
                    reject(error)
                })
            })
            // login(username, password)
        },

        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                var user=JSON.parse(this._vm.$storage.get('userInfo')) 
                var sql=userOpt.getOne.replace('?',user.id)
                this._vm.$http.post('action', { sql: sql }).then(res => {
                    setUserInfo(res.data[0], commit)
                    resolve(res.data[0])
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            })
        },

        updateLoadMenus({ commit }) {
            return new Promise((resolve, reject) => {
                commit('SET_LOAD_MENUS', false)
            })
        }
    }
}

export const setUserInfo = (res, commit) => {
    // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
    if (res.roles.length === 0) {
        commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
    } else {
        commit('SET_ROLES', res.roles)
    }
    commit('SET_NAME', res.username)
    commit('SET_AVATAR', res.avatar)
    commit('SET_EMAIL', res.email)
    commit('SET_CREATE_TIME', parseTime(res.createTime))
}

export default user
