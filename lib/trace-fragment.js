'use strict';

module.exports = `
!function(t,e,a,r,c){t.TracertCmdCache=t.TracertCmdCache||[],t[c]=window[c]||
  {_isInit:!0,call:function(){t.TracertCmdCache.push(arguments)},
  start:function(t){this.call('start',t)}},t[c].l=new Date;
  var n=e.createElement(a),s=e.getElementsByTagName(a)[0];
  n.async=!0,n.src=r,s.parentNode.insertBefore(n,s)}
(window,document,'script','https://tracert.alipay.com/tracert.js','Tracert');
  Tracert.start({ plugins: [ 'BucName' ], spmAPos: 'a254', spmBPos: 'b19448' });
`;
