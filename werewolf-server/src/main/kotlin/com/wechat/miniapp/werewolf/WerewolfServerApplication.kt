package com.wechat.miniapp.werewolf

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication
class WerewolfServerApplication

fun main(args: Array<String>) {
    runApplication<WerewolfServerApplication>(*args)
}