// 通用接口配置文件

// 1. 引入axios
import axios from "axios";

// 2. 定义接口的请求域名

const domain = 'http://localhost:3000';

// 商品分页
export const queryCommodityPage = (currentPage, pageSize)=>{
    return axios.get(domain + "/commodity/commodityPage", {
        params: {
            currentPage, //currentPage : currentPage,
            pageSize     //pagesize : pagesize
        }
    })
}