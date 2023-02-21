var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');



var config = require('config');


/*
todoList：
1、需要写一套高效的兵种比例系统，我规则一放，他就能自动出完所有的兵种，每个兵种，各司其职；
2、

*/



/*
    现在需要能够循环出，每个兵种应该有多少个各种兵种。
    所以需要搞明白存储怎么用


    运营规则、普涨策略；

*/


module.exports.loop = function () {



    //判断小兵是否不够， 字符串直接检索匹配，取消循环
    for(let name in config.role) {

            // console.log(value);
            // console.log(config.role[value]);

            //获取当前游戏里一共有多少单位
            
            if(((JSON.stringify(Game.creeps).toLowerCase().split(name).length -1 )/2) <  config.role[name].maxSupply  ){
            // 数量不够，就补齐对应的单位

            // console.log('正在生产'+name+'现在已有：'+(JSON.stringify(Game.creeps).toLowerCase().split(name).length -1 )/2 );
                // console.log(name+'：数量不够');

                if( Game.spawns['Spawn1'].store.getUsedCapacity(RESOURCE_ENERGY) >= 250) {
                    var newName = name + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                    if(Game.spawns['Spawn1'].spawnCreep(config.role[name].tag, newName) < 0 ){
                        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,CARRY], newName);  
                        
                        // console.log(Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,CARRY], newName));   
                    }
   
                }else{
                        break;
                }
        

            }else{
            // 数量够，怎么操作

            //  break;
            // console.log((JSON.stringify(Memory.creeps).toLowerCase()));


            }


        // if(!Game.creeps[name]) {
        //     delete Memory.creeps[name];
        //     // console.log('memory删除的小兵名字:', name);
        
        // }
    }



    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.name.toLowerCase().indexOf('harvester') !== -1 ) {
            config.role.harvester.actionArr.run(creep);
        }
        
        if(creep.name.toLowerCase().indexOf('upgrader') !== -1 ) {
            config.role.upgrader.actionArr.run(creep);
        }
        
        if(creep.name.toLowerCase().indexOf('builder') !== -1 ) {
            config.role.builder.actionArr.run(creep);
        }
    }






    //检查内存是否被滥用，如果内存里的名字不存在活着的小兵，就删除

    //遍历所有小兵
    // for(var name in Memory.creeps) {





    //     if(!Game.creeps[name]) {
    //         delete Memory.creeps[name];
    //         // console.log('memory删除的小兵名字:', name);
    //     }
    // }

    //通过内存查询，现在还有多少采集者
    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);

    // //如果采集者少于4，就开始生成采集者
    // if(harvesters.length < 4 &&  Game.spawns['Spawn1'].store.getUsedCapacity(RESOURCE_ENERGY) >= 200 ) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'harvester'}});        
    // }



    //如果采集者少于2，就开始生成采集者
    // if(harvesters.length < 3 &&  Game.spawns['Spawn1'].store.getUsedCapacity(RESOURCE_ENERGY) >= 200 ) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'harvester'}});        
    // }





    var tower = Game.getObjectById('421d920487aa75978572a980');
    if(tower) {

        //获取炮塔范围内的受伤建筑， 判断血值是否低于最大值
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        //如果有受伤的建筑，就开始维修
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        

        //判断炮塔范围内是否有敌军，有的话就进攻
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

   
}