'use strict';
// 仅有几何。关系、方向和载荷均取自 content.cjs，不在此复制语义。
module.exports={
 desktop:{width:1040,height:540,
  boxes:{user:[24,58,166,76],codex:[242,58,190,76],artifact:[512,58,198,76],validator:[810,58,206,76],baseline:[24,237,166,86],workflow:[242,237,190,86],da:[512,237,198,86],review:[810,237,206,86],bridge:[242,432,190,82],delivery:[810,432,206,82],optional:[24,407,166,125]},
  children:{reasoned:[34,432,146,22],curation:[34,455,146,22],writing:[34,478,146,22],domain:[34,501,146,22]},
  paths:{
   request:['M190 96H242',216,87],authority:['M107 134V237',107,185],
   route:['M337 134V237',337,185],build:['M432 96H512',472,87],subject:['M710 96H810',760,87],
   run:['M395 134V166H913V134',650,166],
   evidence:['M870 134V202H652V237',762,202],
   scope:['M107 323V360H570V323',500,360],
   check:['M432 278H512',472,267],
   commission:['M409 323V393H913V323',748,393],
   reviewResult:['M810 278H710',760,267],
   transport:['M337 323V432',337,380],
   repair:['M242 474H214V212H270V134',214,213],
   allow:['M652 323V473H810',732,473],
   return:['M1016 473H1030V22H107V58',869,22],
   skills:['M242 300H200V468H190',205,387]
  }
 },
 mobile:{width:360,height:1710,
  boxes:{user:[76,30,208,76],workflow:[76,185,208,82],codex:[76,340,208,82],artifact:[76,495,208,82],validator:[76,650,208,82],baseline:[50,815,118,84],review:[204,815,140,84],da:[76,1000,208,92],bridge:[76,1190,208,82],delivery:[76,1380,208,82],optional:[16,1550,328,136]},
  children:{reasoned:[28,1586,146,32],curation:[186,1586,146,32],writing:[28,1635,146,32],domain:[186,1635,146,32]},
  paths:{
   request:['M284 68H305V367H284',305,303],
   authority:['M76 68H44V856H50',44,780],
   route:['M180 267V340',180,304],build:['M180 422V495',180,459],subject:['M180 577V650',180,614],
   run:['M284 388H327V691H284',315,535],
   evidence:['M180 732V1000',180,776],
   scope:['M109 899V949H130V1000',98,949],
   check:['M76 222H16V1120H156V1092',98,1120],
   commission:['M284 226H349V856H344',311,750],
   reviewResult:['M274 899V949H240V1000',271,949],
   transport:['M76 245H32V1231H76',62,1157],
   repair:['M76 1251H4V388H76',42,452],
   allow:['M250 1092V1135H308V1335H180V1380',239,1335],
   return:['M284 1421H357V8H180V30',284,8],
   skills:['M76 201H24V1508H180V1550',180,1508]
  }
 }
};
