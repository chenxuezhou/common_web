import { initData } from '@/api/data'
import { pageList } from '@/sqlMap'
export default {
    data() {
        return {
            loading: true, data: [], page: 0, size: 10, total: 0, url: '',sort:'', like:{},and:{},or:{}, query: {}, time: 170
        }
    },
    methods: {
        async init() {
            if (!await this.beforeInit()) {
                return
            }
            return new Promise((resolve, reject) => {
                this.loading = true
                var listQuery={like:this.like,and:this.and,or:this.or}
                var sql = pageList.page(this.url, this.page, this.size,listQuery,this.sort)
                this.$http.post('action', { sql: sql }).then(res => {
                    this.data = res.data
                    sql = pageList.count(this.url, listQuery)
                    this.$http.post('action', { sql: sql }).then(res => {
                        this.total = res.data[0].count
                        setTimeout(() => {
                            this.loading = false
                        }, this.time)
                        resolve(res)
                    }).catch(err => {
                        this.loading = false
                        reject(err)
                    })
                })
            })
        },
        beforeInit() {
            return true
        },
        pageChange(e) {
            this.page = e - 1
            this.init()
        },
        sizeChange(e) {
            this.page = 0
            this.size = e
            this.init()
        }
    }
}
