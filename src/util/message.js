import requestUtil from "@/util/request"
import {dayjs} from "element-plus";
import axios from 'axios';
/*
功能：生成消息并推送给指定用户
使用方法：
<script>
import messageUtil from "@/util/message"

const _functionname = async (_params) => {
  await messageUtil.createMessage("whosend", userId, "title", "body")
}
 */
export async function createMessage(send, receive, title, body){
    await requestUtil.post('message/create', {
        send: send,
        receive: receive,
        title: title,
        body: body
    })
}

export async function getUnreadMessageNumber(receive){
    const rec = await requestUtil.get('message/unreadnumberselect', {
        receive: receive
    })
    console.log(rec.data)
    return rec.data
}
export default {
    createMessage,
    getUnreadMessageNumber
}