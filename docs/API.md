# 东晟校园生活API文档
> 注：为防止真实服务端API暴露造成的一系列安全问题，本文档API仅为概念API。
## 充电 docharge
请求：
```json
{
    "ordertype": "docharge",
    "qrcode": <integer>, // 充电桩二维码
    "origin": "cloud"
}
```
响应：
未处理
## 获取充电信息 chargestatus
请求：
```json
{
    "ordertype": "chargestatus",
    "origin": "cloud"
}
```
响应：
未处理
