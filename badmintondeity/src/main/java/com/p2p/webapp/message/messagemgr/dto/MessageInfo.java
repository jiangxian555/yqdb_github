package com.p2p.webapp.message.messagemgr.dto;

import java.util.Date;

/**
 * @description 消息info
 * @author
 * @date 2016-1-20 下午3:56:31
 */
public class MessageInfo {
    /**
     * @Fields message_id : 主键报名id
     */
    private String message_id;

    /**
     * @Fields publisher_id : 发布者
     */
    private String publisher_id;

    /**
     * @Fields message_type : 消息类型
     */
    private String message_type;

    /**
     * @Fields theme : 主题
     */
    private String theme;

    /**
     * @Fields content : 内容
     */
    private String content;

    /**
     * @Fields creat_date : 发布时间
     */
    private Date creat_date;

    public String getMessage_id() {
        return message_id;
    }

    public void setMessage_id(String message_id) {
        this.message_id = message_id;
    }

    public String getPublisher_id() {
        return publisher_id;
    }

    public void setPublisher_id(String publisher_id) {
        this.publisher_id = publisher_id;
    }

    public String getMessage_type() {
        return message_type;
    }

    public void setMessage_type(String message_type) {
        this.message_type = message_type;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreat_date() {
        return creat_date;
    }

    public void setCreat_date(Date creat_date) {
        this.creat_date = creat_date;
    }

}
