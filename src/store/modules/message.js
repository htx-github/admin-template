// import moment from 'moment';
// import { getUserTaskCount } from '@/api/workflow/workflow';
// import Socket from '@/utils/socket';

const messages = {
  state: {
    messages: [],
    messageTotal: 0
    // webSocket: new Socket()
  }
  // mutations: {
  //   saveMessage(state, messages) {
  //     state.messages = messages;
  //   },
  //   saveMessageTotal(state, total) {
  //     state.messageTotal = total;
  //   }
  // },
  // actions: {
  //   async getTaskMessage({ commit }) {
  //     const res = await getUserTaskCount();
  //     if (res.ok) {
  //       onMessage(res.data, commit);
  //     }
  //   },
  //   openConnect({ commit, state }, props) {
  //     state.webSocket.openConnect(props.url);
  //     state.webSocket.subscribe(props.target, data => onMessage(data, commit));
  //   },
  //   disConnect({ state }) {
  //     state.webSocket.disConnect();
  //   }
  // }
};

/**
 * 生成消息
 */
// function generateMessage(assignCount, candidateCount) {
//   const messages = [];
//   messages.push({
//     to: '/office/task/personal',
//     title: '个人任务',
//     img: require('../../icons/svg/task.svg'),
//     time: moment.duration(1, 'minutes').humanize(),
//     content: `您有 ${assignCount} 个任务需要处理，点击处理。`
//   });
//   messages.push({
//     to: '/office/task/personal',
//     title: '可选任务',
//     img: require('../../icons/svg/task2.svg'),
//     time: moment.duration(1, 'minutes').humanize(),
//     content: `您有 ${candidateCount} 个任务需要处理，点击处理。`
//   });
//   return messages;
// }

// /**
//  * 处理订阅消息
//  */
// function onMessage(data, commit) {
//   const messages = generateMessage(data.assignCount, data.candidateCount);
//   commit('saveMessage', messages);
//   commit('saveMessageTotal', data.count);
// }

export default messages;
