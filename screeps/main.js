var roleHarvester = require('role.harvester');
// 创建元素
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );
//创建一个升级的元素
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );
//为元素分组
// Game.creeps['Harvester1'].memory.role = 'harvester';
// module.exports.loop = function () {

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         roleHarvester.run(creep);
//     }
// }



// var roleHarvester = require('role.harvester');
// var roleUpgrader = require('role.upgrader');

// module.exports.loop = function () {

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         if(creep.memory.role == 'upgrader') {
//             roleUpgrader.run(creep);
//         }
//     }
// }

//创建一个建筑工人
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',     { memory: { role: 'builder' } } );
// var roleHarvester = require('role.harvester');
// var roleBuilder = require('role.builder');

// module.exports.loop = function () {

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         if(creep.memory.role == 'builder') {
//             roleBuilder.run(creep);
//         }
//     }
// }
//多存储建造完毕后的写法
// var roleHarvester = require('role.harvester');
// var roleBuilder = require('role.builder');

// module.exports.loop = function () {

//     for(var name in Game.rooms) {
//         console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
//     }

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         if(creep.memory.role == 'builder') {
//             roleBuilder.run(creep);
//         }
//     }
// }

//存储满了 之后就能创建个大的Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],'HarvesterBig',{ memory: { role: 'harvester' } } );


//Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );建造防御塔
// var roleHarvester = require('role.harvester');
// var roleUpgrader = require('role.upgrader');
// var roleBuilder = require('role.builder');

// module.exports.loop = function () {

//     var tower = Game.getObjectById('2faf5a87c3a932a4763c5bb6');
//     if(tower) {
//         var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//         if(closestHostile) {
//             tower.attack(closestHostile);
//         }
//     }

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         if(creep.memory.role == 'upgrader') {
//             roleUpgrader.run(creep);
//         }
//         if(creep.memory.role == 'builder') {
//             roleBuilder.run(creep);
//         }
//     }
// }
//带自动修墙的
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var tower = Game.getObjectById('2faf5a87c3a932a4763c5bb6');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // console.log('upgraders: ' + upgraders.length);
    if(upgraders.length < 5) {
        var newName = 'upgraders' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }

    var builderers = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // console.log('builderers: ' + builderers.length);
    if(builderers.length < 1) {
        var newName = 'builderers' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }
}