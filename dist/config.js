var config = {

    /**  直接把数据存成变量吧，这个不占内存 **/

    role:{
        /*
            harvester 	采矿者 	将能量或元素矿开采出来并存入指定的结构中。
            upgrader 	升级者 	从指定的结构中取出能量升级房间控制器。
            builder 	建造者 	从指定的结构中取出能量并建造结构。
            carrier 	运输者 	将能量从指定结构取出并存入指定的结构。
            repairer 	维修者 	从指定的结构中取出能量并修复受损的结构。
            defender 	防御者 	驻守指定区域并防御。
        */

        harvester:{
            maxSupply:9,
            tag:[CARRY,CARRY,CARRY,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            actionArr:require('role.harvester'),
        },
        upgrader:{
            maxSupply:3,
            tag:[CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE],
            actionArr:require('role.upgrader'),
        },
        builder:{
            maxSupply:6,
            tag:[CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE],
            actionArr:require('role.builder'),
        },
        carrier:{
            maxSupply:0,
            actionArr:require('role.carrier'),
        },
        repairer:{
            maxSupply:0,
            actionArr:require('role.repairer'),
        },
        defender:{
            maxSupply:0,
            actionArr:require('role.defender'),
        },
    },

    sourceTarget:
    [
        {
            harvesterMax:3
        },
        {
            harvesterMax:3
        },
        {
            harvesterMax:0
        },
        {
            harvesterMax:1
        },

    ],

    init:()=>{
        
    },




};

module.exports = config;