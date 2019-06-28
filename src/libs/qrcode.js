
import Core from './core';

const init = function (instance) {
};

const temporary = async function (scene, expireSeconds = null) {
  expireSeconds = parseInt(expireSeconds);
  if (expireSeconds <= 0 || expireSeconds > 2592000) expireSeconds = 2592000;
  let action_name = '';
  if (typeof scene == 'string') {
    scene = {scene_str: scene};
    action_name = 'QR_STR_SCENE';
  }
  else {
    scene = {scene_id: scene};
    action_name = 'QR_SCENE';
  }
  let data = {
    expire_seconds: expireSeconds,
    action_name,
    action_info: {scene}
  };
  let instance = Core.getInstance();
  let url = await instance.buildApiUrl('qrcode/create');
  return await instance.requestPost(url, data);
};

const forever = async function (scene) {
  let action_name = '';
  if (typeof scene == 'string') {
    scene = {scene_str: scene};
    action_name = 'QR_LIMIT_STR_SCENE';
  }
  else {
    scene = {scene_id: scene};
    action_name = 'QR_LIMIT_SCENE';
  }
  let data = {
    action_name,
    action_info: {scene}
  };
  let instance = Core.getInstance();
  let url = await instance.buildApiUrl('qrcode/create');
  return await instance.requestPost(url, data);
};

const url = async function (ticket) {
  let url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + ticket;
  let instance = Core.getInstance();
  return await instance.requestFile(url);
};

export default {
  init,
  temporary,
  forever,
  url
};
