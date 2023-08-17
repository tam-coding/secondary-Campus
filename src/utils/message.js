
// 获取所有聊天记录
export const getMessageRecords = () => {
    const messageRecords = JSON.parse(localStorage.getItem("messageRecords")) || [];
    return messageRecords;
  }
  
  // 根据 selfUid 和 otherUid 获取对应的 messageList
  export const getMessage = (selfUid, otherUid) => {
    // console.log('我是util中的getMessage'+selfUid+'-----'+otherUid);
    const messageRecords = getMessageRecords();
    const record = messageRecords.find(record => 
      (record.selfUid === selfUid && record.otherUid === otherUid)
    );
    return record ? record.messageList : [];
  }
  
  // 删除指定的 messageList
  export const removeMessage = (selfUid, otherUid) => {
    const messageRecords = getMessageRecords();
    const updatedRecords = messageRecords.filter(record => 
      (record.selfUid !== selfUid || record.otherUid !== otherUid) 
    );
    localStorage.setItem("messageRecords", JSON.stringify(updatedRecords));
  }
  
  // 将消息追加到对应的 messageList
  export const setMessage = (selfUid, otherUid, message) => {
    const messageRecords = getMessageRecords();
    const recordIndex = messageRecords.findIndex(record => 
      (record.selfUid === selfUid && record.otherUid === otherUid)
    );
  
    if (recordIndex !== -1) {
      messageRecords[recordIndex].messageList.push(message);
    } else {
      const newRecord = {
        noReplyNum:0,
        selfUid: selfUid,
        otherUid: otherUid,
        messageList: [message]
      };
      messageRecords.push(newRecord);
    }
  
    localStorage.setItem("messageRecords", JSON.stringify(messageRecords));
  }
  
  //noReplyNum
  export const getNoReplyNum = (selfUid, otherUid) => {
    const messageRecords = getMessageRecords();
    const record = messageRecords.find(record => 
      (record.selfUid === selfUid && record.otherUid === otherUid)
    );
    return record ? record.noReplyNum : 0;
  }

  export const increaseNoReplyNum = (selfUid, otherUid) => {
    const messageRecords = getMessageRecords();
    const recordIndex = messageRecords.findIndex(record => 
      (record.selfUid === selfUid && record.otherUid === otherUid)
    );
  
    if (recordIndex !== -1) {
      messageRecords[recordIndex].noReplyNum += 1;
      localStorage.setItem("messageRecords", JSON.stringify(messageRecords));
    }
  }

  export const clearNoReplyNum = (selfUid, otherUid) => {
    const messageRecords = getMessageRecords();
    const recordIndex = messageRecords.findIndex(record => 
      (record.selfUid === selfUid && record.otherUid === otherUid)
    );
  
    if (recordIndex !== -1) {
      messageRecords[recordIndex].noReplyNum = 0;
      localStorage.setItem("messageRecords", JSON.stringify(messageRecords));
    }
  }
  //获取所有不包括messageList 字段的数据
  export const getAllNoReplyNum = () => {
    const messageRecords = getMessageRecords();
    const recordsWithoutMessageList = messageRecords.map(record => {
      const { messageList, ...recordWithoutMessageList } = record;
      return recordWithoutMessageList;
    });
  
    return recordsWithoutMessageList;
  }