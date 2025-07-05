package com.wechat.miniapp.werewolf.data

data class LoginResponse(
    val openid: String,
    val sessionKey: String,
    val unionid: String,
    val errcode: Int,
    val errmsg: String
)