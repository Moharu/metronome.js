#!/usr/bin/env node
// wrapper for a function that plays sound
const spawn = require('child_process').spawn
var playSound = function(filepath, callback){
    if(!callback)
        callback = () => {}
    var process = spawn('play', [filepath])
    process.on('close', callback)
}

// Locations for high and low noises
var path = require('path')
var high = path.join(__dirname, './sound/HighSeiko.wav')
var low = path.join(__dirname, './sound/LowSeiko.wav')

// Default args
var bpm = 120, steps = 4;
// Iterates over execution arguments looking for -b/--bpm and -s/--step
process.argv.forEach((val, index) => {
    if((val.indexOf('-b') != -1) || (val.indexOf('--bpm') != -1)){
        var nextValue = process.argv[index+1]
        if(nextValue >= 30 && nextValue <= 300){
            bpm = nextValue
        } else {
            throw new Error('Invalid value for bpm: ' + nextValue )
        }
    }
    if((val.indexOf('-s') != -1) || (val.indexOf('--step') != -1)){
        var nextValue = process.argv[index+1]
        if(nextValue >= 1 && nextValue <= 16){
            steps = nextValue
        } else {
            throw new Error('Invalid value for step: ' + nextValue )
        }
    }
})

var startMetronome = function(bpm, steps){
    var delay = (60 * 1000) / bpm
    var count = steps - 1
    return setInterval(() => {
        if(++count == steps){
            playSound(high)
            count = 0
        }else{
            playSound(low)
        }
    }, delay)
}

startMetronome(bpm,steps);