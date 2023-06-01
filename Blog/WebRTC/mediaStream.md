
WebRTC 源码中 定义了两套C++接口，分别是 mediaStream  和 PeerConnectioin.

## 相关概念
* source: source 负责生产媒体资源
* sink: sink负责消费，主要负责将source 呈现给用户
* mediatrack:单一类型的媒体流（音频或视频）。
* mediastream: 音视频的实际数据流的抽象表示。
* peerConnection: 允许两个用户在浏览器之间直接通信。TA表示与远端对等点的关联。
  * 远程对等点通常是你在远端运行的同一个JS应用程度的另一个实例
* DataChannel: 

### Source
source可以添加、移除、更新sink，从而将 videoFrame 送给对应的 sink处理。
一个source 可以对应多个 sink

### Sink
sink 通过 onFrame 获取 source 传递的 VideoFrame

### MediaTrack
一个 track 由 source 和 sink 组成。Source给 track提供数据，

### MediaStream
mediaStream 用于将多个 mediaStreamTrack 打包到一起。
所以一个mediaStream 包含 0 或多个 mediaStreamTrack对象。 mediaStream中所有的 mediaStreamTrack对象必须在渲染时同步。
MediaStream 可以添加或移除 audioTrack 或 videoTrack.

### RTCPeerConnection
PeerConnection 表示本地计算机 和 远程对等点之间的 WebRTC 连接。TA提供了连接到远程对等点、维护和监视连接以及在不需要时关闭连接的方法。

Q： 若1个本地设备，N个远程，则有几个 RTCPeerConnection ?

### RTCDataChannel
RTCDataChannel表示在两人之间建立一个双向数据通道的连接。
提供通用传输服务，允许Web浏览器以双向对等方式交换通用数据。

RTCDataChannel 接口表示两个对等点之间的双向数据通道。 每个数据通道都有一个关联的基础数据传输，用于将数据传输到另一个对等方。 创建通道后，对等方将配置基础数据传输的属性（表3-1）。 创建通道后，通道的属性无法更改。 对等方之间的实际 有线 (wire) 协议为 SCTP （请参见第8页的“数据通道”）。

可以将 RTCDataChannel 配置为在不同的可靠性模式下运行。 可靠的通道可确保通过重传将数据传递到另一个对等方。 不可靠的通道配置为限制重传次数 (maxRetransmits) 或设置允许重传的时间 (maxRetransmitTime)。 这些属性不能同时使用，尝试这样做会导致错误。 不设置任何这些属性会导致创建可靠的通道。

#### 事件
* onopen
* onclose


### RTCSessionDescription
RTCSessionDescription 描述连接或潜在连接的一端的配置方式。
每一个RTCSessionDescription 由一个描述类型组成，该描述类型指示TA 所描述或应答的协商过程的SDP协议的相关描述。

RTCSessionDescription 在两个对等点之间协商连接的过程涉及来回交换对象，每个描述都表示描述的发送者支持的连接配置选项的一个组合。一旦两个对等方就连接的配置达成一致，协商就完成了。

## WebRTC API
大致可以分为三类：
1. 本地和远程音视频的获取和管理 （MediaStream、<audio>、 <video>）
2. 连接管理 RTCPeerConnection
3. 管理任意数据 RTCDataChannel 

### 本地及远程音视频获取和管理
* 
* startVideoCapture

### 连接管理 RTCPeerConnection
如何向其他浏览器发送和接收媒体

* new RTCPeerConnection(config) 创建一个 RTCPeerConnection
* 

### 管理任意数据 RTCDataChannel 

如何将DataChannel 添加到 PeerConnection
