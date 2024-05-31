import requestUtil from "@/util/request"
import {dayjs} from "element-plus";
export async function createMessage(send, receive, title, body){
    const now = dayjs()
    const send_date = now.format('YYYY-MM-DD')
    const send_time = now.format('HH:mm:ss')
    const message = new Map()
    message.set('send', send)
    message.set('receive', receive)
    message.set('title', title)
    message.set('body', body)
    message.set('send_date', send_date)
    message.set('send_time', send_time)
    await requestUtil.post('message/create', {
        messagemap: message
    })
}
export default {
    createMessage
}