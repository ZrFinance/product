import { fetch } from './fetch'
import Vue from 'vue'

import { Message } from 'element-ui';

// 登录
export function requestLogin (data, callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/login`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 密码修改
export function requestUpdpasswd (data, callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/updpasswd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}



// 提供帮助列表
export function requestTgbz (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/tgbzquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 订单删除
export function requestDelOrder (data, callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/delorder`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}

// 匹配池增加
export function requestMatchAdd (data, callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/matchadd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 匹配池查询
export function requestMatchQuery (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/matchquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}

// 匹配池删除
export function requestMatchDel (data, callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/matchdel`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}

// 用户列表查询
export function requestUserQuery (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/userquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 用户修改
export function requestUserUpd (data,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/userupd`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 金币赠送
export function requestAmountSend (data,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/amountsend`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}

// 订单拆分
export function requestOrderSplit (data,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/ordersplit`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 接受帮助列表
export function requestJsbz (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/jsbzquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 匹配
export function requestMatch (callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/match`,
    method: 'POST',
    data: {}
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 提供帮助状态数据查询
export function requestOrderQuery (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/orderquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 交易明细类型查询
export function requestTranlisttrannamequery (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/tranlisttrannamequery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 交易明细查询
export function requestTranlistquery (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/tranlistquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}



// 系统参数查询
export function requestSysparamquery (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/sysparamquery`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 系统参数修改
export function requestSysparamupd (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/sysparamupd`,
    method: 'post',
    data: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}



// 订单统计查询
export function requestOrdercount (params,callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/ordercount`,
    method: 'get',
    params: params
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}



// 交易中和完成订单删除
export function requestDelServerOrder (data, callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/orderserverdel`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}


// 交易明细删除
export function requestDelTranlistserverdel (data, callback ,errorcallback) {
  return fetch({
    url: `/api/serveradmin/tranlistserverdel`,
    method: 'post',
    data: data
  }).then((res) => {
    if (res && res.data.rescode !== '10000') {
      if (typeof errorcallback === 'function') {
        errorcallback(res)
      }
      Message({
        message: res.data.msg,
        type: 'error'
      });
    } else {
      if (typeof callback === 'function') {
        callback(res)
      }
      Message({
        message: res.data.msg,
        type: 'success'
      });
    }
  }).catch(() => {
      Message({
        message: '请求失败',
        type: 'error'
      });
  })
}