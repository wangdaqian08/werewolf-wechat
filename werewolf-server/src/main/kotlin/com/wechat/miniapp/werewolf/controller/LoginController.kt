package com.wechat.miniapp.werewolf.controller

import com.wechat.miniapp.werewolf.data.LoginRequest
import com.wechat.miniapp.werewolf.data.LoginResponse
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/login")
class LoginController {
    private val logger = LoggerFactory.getLogger(LoginController::class.java)

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun login(@RequestBody request: LoginRequest): LoginResponse {
        logger.info("login request: {}", request)
        // TODO: Implement real logic to exchange code for openid/session_key/unionid
        return LoginResponse(
            openid = "xxxxxx",
            sessionKey = "xxxxx",
            unionid = "xxxxx",
            errcode = 0,
            errmsg = "xxxxx"
        )
    }
}