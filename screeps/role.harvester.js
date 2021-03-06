var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   // if(creep.store.getFreeCapacity() > 0) {
	   if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            var sources = creep.room.find(FIND_SOURCES);
            // console.log(creep.harvest(sources[0]))
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = roleHarvester;
//多个存储的写法
// var roleHarvester = {

//     /** @param {Creep} creep **/
//     run: function(creep) {
// 	    if(creep.store.getFreeCapacity() > 0) {
//             var sources = creep.room.find(FIND_SOURCES);
//             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
//             }
//         }
//         else {
//             var targets = creep.room.find(FIND_STRUCTURES, {
//                     filter: (structure) => {
//                         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
//                             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//                     }
//             });
//             if(targets.length > 0) {
//                 if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//                 }
//             }
//         }
// 	}
// };

// module.exports = roleHarvester;

//为防御塔充能
// var roleHarvester = {

//     /** @param {Creep} creep **/
//     run: function(creep) {
// 	    if(creep.store.getFreeCapacity() > 0) {
//             var sources = creep.room.find(FIND_SOURCES);
//             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
//             }
//         }
//         else {
//             var targets = creep.room.find(FIND_STRUCTURES, {
//                     filter: (structure) => {
//                         return (structure.structureType == STRUCTURE_EXTENSION ||
//                                 structure.structureType == STRUCTURE_SPAWN ||
//                                 structure.structureType == STRUCTURE_TOWER) && 
//                                 structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//                     }
//             });
//             if(targets.length > 0) {
//                 if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//                 }
//             }
//         }
// 	}
// };

// module.exports = roleHarvester;//多个存储的写法
// var roleHarvester = {

//     /** @param {Creep} creep **/
//     run: function(creep) {
// 	    if(creep.store.getFreeCapacity() > 0) {
//             var sources = creep.room.find(FIND_SOURCES);
//             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
//             }
//         }
//         else {
//             var targets = creep.room.find(FIND_STRUCTURES, {
//                     filter: (structure) => {
//                         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
//                             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//                     }
//             });
//             if(targets.length > 0) {
//                 if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//                 }
//             }
//         }
// 	}
// };

// module.exports = roleHarvester;

//为防御塔充能
// var roleHarvester = {

//     /** @param {Creep} creep **/
//     run: function(creep) {
// 	    if(creep.store.getFreeCapacity() > 0) {
//             var sources = creep.room.find(FIND_SOURCES);
//             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
//             }
//         }
//         else {
//             var targets = creep.room.find(FIND_STRUCTURES, {
//                     filter: (structure) => {
//                         return (structure.structureType == STRUCTURE_EXTENSION ||
//                                 structure.structureType == STRUCTURE_SPAWN ||
//                                 structure.structureType == STRUCTURE_TOWER) && 
//                                 structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//                     }
//             });
//             if(targets.length > 0) {
//                 if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//                 }
//             }
//         }
// 	}
// };

// module.exports = roleHarvester;
