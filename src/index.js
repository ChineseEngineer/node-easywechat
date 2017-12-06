
import EasyWechat from './libs/core';
import oauth from './libs/oauth';
import cache from './libs/cache';
import access_token from './libs/access_token';
import jssdk from './libs/jssdk';
import server from './libs/server';
import notice from './libs/notice';
import qrcode from './libs/qrcode';
import user from './libs/user';
import * as messages from './libs/message';

EasyWechat.registPlugin('oauth', oauth);
EasyWechat.registPlugin('cache', cache);
EasyWechat.registPlugin('access_token', access_token);
EasyWechat.registPlugin('jssdk', jssdk);
EasyWechat.registPlugin('server', server);
EasyWechat.registPlugin('notice', notice);
EasyWechat.registPlugin('qrcode', qrcode);
EasyWechat.registPlugin('user', user);

for (let k in messages) {
  EasyWechat[k] = messages[k];
}

export default EasyWechat;
