import EventEmitter from 'eventemitter3';

type WebscoketClientInterceptorsName = 'send' | 'message' | 'sub' | 'unsub';
type WebsocketClientInterceptorsCallback = (...args: any[]) => any;
declare class WebscoketClientInterceptor {
    interceptorNames: WebscoketClientInterceptorsName[];
    interceptors: Record<WebscoketClientInterceptorsName, WebsocketClientInterceptorsCallback[]>;
    constructor();
    use(name: WebscoketClientInterceptorsName, interceptor: WebsocketClientInterceptorsCallback): void;
    eject(name: WebscoketClientInterceptorsName, interceptor: WebsocketClientInterceptorsCallback): void;
    run(name: WebscoketClientInterceptorsName, data: any, content: any): Promise<any>;
}

interface WebsocketClientReconnectorOptions {
    maxCount?: number;
    interval?: number;
    tasks?: WebsocketClientReconnectorTasks;
}
type WebsocketClientReconnectorTasks = Record<string, (...args: any[]) => any>;
declare class WebsocketClientReconnector {
    private initOptions;
    private state;
    private count;
    private maxCount;
    private interval;
    private timer;
    private tasks;
    constructor(options?: WebsocketClientReconnectorOptions);
    /**
     * 重置重连器
     */
    reset(): void;
    /**
     * 立刻重连
     */
    run(task?: string): void;
    /**
     * 延迟重连
     */
    delayRun(task?: string): void;
    /**
     * 执行重连任务
     */
    runRecconectTask(task: string): any;
    /**
     * 结束重连
     */
    end(): void;
    clearDelay(): void;
}

declare class WebsocketClientTemplate {
    private templates;
    add(name: string, genaertor: WebsocketClientCallbackAny): void;
    get(name: string): WebsocketClientCallbackAny | undefined;
    generate(name: string, data: any): any;
}

interface WebsocketClientOptions {
    url: string;
    reconnect?: boolean;
    reconnectMaxCount?: number;
    reconnectInterval?: number;
}
type WebsocketClientHooks = 'send' | 'open' | 'message' | 'error' | 'close' | 'sub' | 'unsub';
type WebsocketClientCallbackVoid = (...args: any[]) => void;
type WebsocketClientCallbackAny = (...args: any[]) => any;
declare enum WebsocketClientStatusEnum {
    INIT = 0,
    CONNECTED = 1,
    ERROR = 2,
    CLOSED = 3
}
declare class WebsocketClient {
    private networkIsConnected;
    private url;
    private socket;
    private subCollection;
    private reconnectOpen;
    private reconnectMaxCount;
    private reconnectInterval;
    private reconnectLock;
    private initOptions;
    status: WebsocketClientStatusEnum;
    reconnector: WebsocketClientReconnector;
    template: WebsocketClientTemplate;
    event: EventEmitter;
    interceptor: WebscoketClientInterceptor;
    static template: WebsocketClientTemplate;
    /**
     * 构造函数
     */
    constructor(options: WebsocketClientOptions);
    /**
     * 事件监听、移除、触发
     */
    on(name: WebsocketClientHooks | 'string', callback: WebsocketClientCallbackVoid): void;
    off(name: WebsocketClientHooks | 'string', callback: WebsocketClientCallbackVoid): void;
    emit(name: WebsocketClientHooks | 'string', ...args: any[]): void;
    /**
     * 开启连接
     */
    connect(url?: string): Promise<void>;
    /**
     * 创建连接
     */
    private createConnect;
    /**
     * 关闭连接
     */
    close(): void;
    /**
     * 重新连接
     */
    reconnect(): void;
    /**
     * 发送数据
     * @param {*} data
     */
    send(data: any): Promise<void>;
    /**
     * 基于模板发送数据
     * @param templateId 模板ID
     * @param data 数据
     */
    sendByTemplate(templateId: string, data: any): Promise<void>;
    /**
     * 获取模板管理实例
     * @param templateId 模板ID
     * @returns
     */
    getTemplateIns(templateId: string): WebsocketClientTemplate;
    /**
     * 订阅主题，可以自动发送订阅的模板消息，并在连接后进行自动订阅
     * @param {*} topic 订阅主题
     * @param {*} listener 监听函数
     */
    sub(topic: string, listener: (...args: any[]) => void): void;
    /**
     * 取消订阅
     * @param {*} topic 订阅主题
     * @param {*} listener 监听函数
     */
    unsub(topic: string, listener: (...args: any[]) => void): void;
    /**
     * 发送订阅模板消息
     */
    private sendSub;
    /**
     * socket连接成功
     */
    private handleOpen;
    /**
     * socket收到消息
     * @param {*} msg 数据
     */
    private handelMessage;
    /**
     * socket发生错误
     * @param {*} err 错误对象
     */
    private handleError;
    /**
     * socket连接断开
     */
    private handleClose;
    /**
     * 获取网络是否在线
     */
    private getNetworkOnline;
}
declare function normalizeOptions(options: WebsocketClientOptions): Required<WebsocketClientOptions>;

export { WebsocketClientCallbackAny, WebsocketClientCallbackVoid, WebsocketClientHooks, WebsocketClient as default, normalizeOptions };
