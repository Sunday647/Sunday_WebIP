
## 浏览器中的WebRTC

WebRTC设计背后的总体思想是： 完全指定如何控制媒体平面，同时尽可能将信令平面留给应用层。
基本原理是： 不同的应用程序可能更喜欢用不同的标准化信令协议，甚至一些自定义的东西。

远程对等点：
会话描述：
### WebRTC业务流程
假设有两个用户，本地用户 LocalUser,  和 远端用户 RemoteUser

1. LocalUser 获取本地摄像头、，麦克风信息，创建一个 localMediaStream 对象；【startVideoCapture】
2. 将本地 localMediaStream 对象在本地预览;【setLocalVideoPlayer】
3. 创建一个 RTC-PeerConnection 对象；
4. 将 localMediaStream 添加到新创建的连接中；
5. 将自己的会话描述 Session Description 发送到远程对等点 remote peer;
6. 从远程对等点接收远程的会话描述 remote session description;
7. 处理收到的会话描述，并将 remote stream 添加到 自己的 peerConnection;
8. 本地播放远端流; 【setRemoteVideoPlayer】